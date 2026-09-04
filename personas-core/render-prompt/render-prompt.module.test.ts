import { describe, expect, test } from "bun:test"
import {
  assembleTransformationPrompt,
  buildRenderClause,
  buildSceneScaffold,
  CHANGE_CLAUSE,
  SCENE_PLACEHOLDER,
  UNIVERSAL_SCENE_DIRECTION,
  WALLPAPER_RENDER_TARGET,
} from "./render-prompt.module.code.ts"

describe("buildRenderClause", () => {
  test("names the size the frame is rendered at", () => {
    expect(buildRenderClause(WALLPAPER_RENDER_TARGET)).toBe(
      "Photorealistic with natural skin detail, 3440x1440."
    )
  })
})

describe("CHANGE_CLAUSE", () => {
  test("asks for the whole frame afresh rather than an edit", () => {
    expect(CHANGE_CLAUSE).toContain("recompose the entire frame")
    expect(CHANGE_CLAUSE).toContain("identity locked")
  })
})

describe("UNIVERSAL_SCENE_DIRECTION", () => {
  test("keeps a man out of the frame", () => {
    expect(UNIVERSAL_SCENE_DIRECTION).toContain("Never render a man in the frame")
  })
})

describe("assembleTransformationPrompt", () => {
  test("opens with what is kept and closes with how it renders", () => {
    const prompt = assembleTransformationPrompt({
      keepContract: "Keep her face.",
      scene: "A kitchen at dawn.",
      renderTarget: WALLPAPER_RENDER_TARGET,
    })
    expect(prompt.startsWith("Keep her face. ")).toBe(true)
    expect(prompt.endsWith(buildRenderClause(WALLPAPER_RENDER_TARGET))).toBe(true)
    expect(prompt).toContain(CHANGE_CLAUSE)
    expect(prompt).toContain("A kitchen at dawn.")
  })
})

describe("buildSceneScaffold", () => {
  test("stands a placeholder in where no scene is written", () => {
    const scaffold = buildSceneScaffold({
      closeness: "Close.",
      wardrobe: "Linen.",
      pose: "Seated.",
    })
    expect(scaffold).toContain(SCENE_PLACEHOLDER)
    expect(scaffold).toContain(UNIVERSAL_SCENE_DIRECTION)
  })

  test("takes the placeholder and lens cue it is given", () => {
    const scaffold = buildSceneScaffold({
      closeness: "Close.",
      wardrobe: "Linen.",
      pose: "Seated.",
      scenePlaceholder: "At the window.",
      lensCue: "Shot on 35mm.",
    })
    expect(scaffold).toContain("At the window.")
    expect(scaffold).toContain("Shot on 35mm.")
    expect(scaffold).not.toContain(SCENE_PLACEHOLDER)
  })
})
