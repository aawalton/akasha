import { describe, expect, test } from "bun:test"
import { LEVELS } from "../../../alan/persona/closeness/closeness"
import {
  assembleTransformationPrompt,
  buildRenderClause,
  buildSceneScaffold,
  CHANGE_CLAUSE,
  DEFAULT_LENS_CUE,
  type RenderTarget,
  SCENE_PLACEHOLDER,
  UNIVERSAL_SCENE_DIRECTION,
  WALLPAPER_RENDER_TARGET,
} from "./render-prompt"

const IMAGERY = {
  closeness: "Public-facing: out in the world, composed, observed framing.",
  wardrobe: "Polished public wear.",
  pose: "Composed and self-contained.",
}

const FIRST_PERSON_SELF = /\b(i|me|my|mine|myself)\b|\bi['’](?:m|ve|ll|d)\b/i

const SQUARE: RenderTarget = { aspect: "1:1", width: 1024, height: 1024 }

const KEEP =
  "Keep the exact same woman from the reference image -- identical face, bone structure, " +
  "nose, lips, jawline, skin tone, strong dark brows, and the same natural auburn-chestnut " +
  "hair color, length, and texture. Preserve her two defining elven features exactly as in " +
  "the reference: long, pointed elven ears, and deeply saturated emerald-green eyes. Do not " +
  "slim, age, beautify, or alter her features."

describe("buildSceneScaffold", () => {
  test("composes closeness + wardrobe + pose + universal + placeholder + lens cue, in order", () => {
    expect(buildSceneScaffold(IMAGERY)).toBe(
      `${IMAGERY.closeness} ${IMAGERY.wardrobe} ${IMAGERY.pose} ` +
        `${UNIVERSAL_SCENE_DIRECTION} ${SCENE_PLACEHOLDER} ${DEFAULT_LENS_CUE}`
    )
  })

  test("keeps the closeness line first (the kept line leads the scene)", () => {
    const scene = buildSceneScaffold(IMAGERY)
    expect(scene.startsWith(IMAGERY.closeness)).toBe(true)
  })

  test("folds in each structured axis and the universal scene direction", () => {
    const scene = buildSceneScaffold(IMAGERY)
    expect(scene).toContain(IMAGERY.wardrobe)
    expect(scene).toContain(IMAGERY.pose)
    expect(scene).toContain(UNIVERSAL_SCENE_DIRECTION)
  })

  test("honors a custom placeholder and lens cue (lighting/camera stay free, never level-bound)", () => {
    expect(
      buildSceneScaffold({
        closeness: "C.",
        wardrobe: "W.",
        pose: "P.",
        scenePlaceholder: "<x>.",
        lensCue: "Shot on 50mm.",
      })
    ).toBe(`C. W. P. ${UNIVERSAL_SCENE_DIRECTION} <x>. Shot on 50mm.`)
  })
})

describe("UNIVERSAL_SCENE_DIRECTION", () => {
  test("pins the non-negotiable guardrails: softness lit, orientation-toward gaze, realness, no man in frame", () => {
    expect(UNIVERSAL_SCENE_DIRECTION).toContain("softness")
    expect(UNIVERSAL_SCENE_DIRECTION).toContain("orientation-toward")
    expect(UNIVERSAL_SCENE_DIRECTION).toContain("Realness over perfection")
    expect(UNIVERSAL_SCENE_DIRECTION).toContain("Never render a man in the frame")
  })

  test("does not bind lighting or camera setup (those stay free in the lens cue)", () => {
    expect(UNIVERSAL_SCENE_DIRECTION).not.toContain("85mm")
    expect(UNIVERSAL_SCENE_DIRECTION).not.toContain("daylight")
    expect(UNIVERSAL_SCENE_DIRECTION.toLowerCase()).not.toContain("lit from")
  })
})

describe("per-level assembled prompt (L1-6)", () => {
  for (const entry of LEVELS) {
    test(`L${entry.level} folds closeness/wardrobe/pose + universal into the prompt`, () => {
      const scene = buildSceneScaffold(entry)
      const prompt = assembleTransformationPrompt({
        keepContract: KEEP,
        scene,
        renderTarget: SQUARE,
      })
      expect(prompt).toBe(
        `${KEEP} ${CHANGE_CLAUSE} ${entry.closeness} ${entry.wardrobe} ${entry.pose} ` +
          `${UNIVERSAL_SCENE_DIRECTION} ${SCENE_PLACEHOLDER} ` +
          `${DEFAULT_LENS_CUE} ${buildRenderClause(SQUARE)}`
      )
    })
  }
})

describe("CHANGE_CLAUSE", () => {
  test("frames a full single-frame re-render, not a preserve-original outpaint", () => {
    expect(CHANGE_CLAUSE).toContain("one new photograph")
    expect(CHANGE_CLAUSE).toContain("recompose the entire frame")
    expect(CHANGE_CLAUSE).toContain("rather than editing or extending the original")
  })

  test("is third-person — a directive to the image model, not the persona speaking (#13223)", () => {
    expect(CHANGE_CLAUSE).toContain("Re-render her")
    expect(CHANGE_CLAUSE).toContain("her identity locked")
    expect(CHANGE_CLAUSE).toContain("Change only her pose")
    expect(FIRST_PERSON_SELF.test(CHANGE_CLAUSE)).toBe(false)
  })
})

describe("assembled model prompt is uniformly third-person (#13223 regression guard)", () => {
  for (const entry of LEVELS) {
    for (const target of [SQUARE, WALLPAPER_RENDER_TARGET]) {
      test(`L${entry.level} @ ${target.aspect} carries no first-person self-reference`, () => {
        const scene = buildSceneScaffold(entry)
        const prompt = assembleTransformationPrompt({
          keepContract: KEEP,
          scene,
          renderTarget: target,
        })
        expect(FIRST_PERSON_SELF.test(prompt)).toBe(false)
      })
    }
  }
})

describe("buildRenderClause", () => {
  test("the dimensions are data-driven, not hardcoded per mode", () => {
    expect(buildRenderClause(WALLPAPER_RENDER_TARGET)).toBe(
      "Photorealistic with natural skin detail, 3440x1440."
    )
    expect(buildRenderClause(SQUARE)).toBe("Photorealistic with natural skin detail, 1024x1024.")
    expect(buildRenderClause({ aspect: "9:16", width: 1080, height: 1920 })).toBe(
      "Photorealistic with natural skin detail, 1080x1920."
    )
  })
})

describe("render targets", () => {
  test("wallpaper preset is the ultrawide screen constant", () => {
    expect(WALLPAPER_RENDER_TARGET).toEqual({ aspect: "21:9", width: 3440, height: 1440 })
  })
})

describe("assembleTransformationPrompt", () => {
  test("joins keep-contract, change clause, scene, and render clause in order", () => {
    expect(
      assembleTransformationPrompt({ keepContract: KEEP, scene: "a scene.", renderTarget: SQUARE })
    ).toBe(`${KEEP} ${CHANGE_CLAUSE} a scene. ${buildRenderClause(SQUARE)}`)
  })

  test("the render target sets the dimensions without a new mode", () => {
    const prompt = assembleTransformationPrompt({
      keepContract: KEEP,
      scene: "a scene.",
      renderTarget: WALLPAPER_RENDER_TARGET,
    })
    expect(prompt.endsWith("Photorealistic with natural skin detail, 3440x1440.")).toBe(true)
    expect(prompt).toContain(`${KEEP} ${CHANGE_CLAUSE} a scene.`)
  })

  test("round-trips with a page keep-contract and a built scaffold", () => {
    const scene = buildSceneScaffold({
      closeness: "Relaxed and personal.",
      wardrobe: "Loungewear.",
      pose: "Curled on the couch.",
    })
    const prompt = assembleTransformationPrompt({ keepContract: KEEP, scene, renderTarget: SQUARE })
    expect(prompt).toContain(KEEP)
    expect(prompt).toContain(CHANGE_CLAUSE)
    expect(prompt).toContain(SCENE_PLACEHOLDER)
    expect(prompt.indexOf(CHANGE_CLAUSE)).toBeGreaterThan(prompt.indexOf("Keep the exact"))
    expect(prompt.indexOf(buildRenderClause(SQUARE))).toBeGreaterThan(
      prompt.indexOf(SCENE_PLACEHOLDER)
    )
  })
})
