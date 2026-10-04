import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"
import {
  fetchImage,
  runComfyGraph,
} from "akasha/infrastructure/inference/client/modules/comfy-client/comfy-client.module.code.ts"
import { drawSeed } from "akasha/infrastructure/inference/client/modules/inference-seed/inference-seed.module.code.ts"
import { makingValues } from "akasha/infrastructure/inference/generation/image/modules/making/image-making.module.code.ts"
import {
  bytesOfImage,
  endingOf,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { EDIT_MODEL } from "akasha/infrastructure/inference/generation/zimage/modules/edit-graph/zimage-edit-graph.module.code.ts"
import { editedBy } from "akasha/infrastructure/inference/generation/zimage/modules/edit-running/zimage-edit-running.module.code.ts"
import { baseOf } from "akasha/infrastructure/inference/generation/zimage/modules/explore-batch/zimage-explore-batch.module.code.ts"
import { buildModelGraph } from "akasha/infrastructure/inference/generation/zimage/modules/graph/zimage-graph.module.code.ts"
import { MODELS } from "akasha/infrastructure/inference/generation/zimage/modules/models/zimage-models.module.code.ts"
import { defaultPersistImageDeps } from "akasha/infrastructure/inference/run/modules/persist-image/persist-image.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { recordIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"

const STORY_MODEL: keyof typeof MODELS = "beyond-reality-3"

const EDIT_SERVICE = "image-edit-qwen"

const EDIT = "edit"

const IMAGE_OPENS = "image/"

const WIDTH = 832

const HEIGHT = 1216

const DRAWN_WITHIN_MS = 15 * 60_000

const INPUT_GONE = "The picture this was made from is gone, so it can't be redrawn."

export type Drawing = {
  readonly model: string
  readonly prompt: string
  readonly steps: number
  readonly guidance: number
  readonly width: number
  readonly height: number
}

export type Editing = { readonly prompt: string; readonly input: string }

export type Redraw = Drawing | Editing

type Refused = { readonly refused: string }

export type Looking = {
  readonly image: (address: string) => Value | null
  readonly subjectCover: () => string | null
}

function numberIn(value: Value, key: string, fallback: number): number {
  const held = value[key]
  return typeof held === "number" && Number.isFinite(held) ? held : fallback
}

export function madeByEdit(image: Value | null): boolean {
  return (
    image !== null &&
    textAt(image, "service") === EDIT_SERVICE &&
    textAt(image, "operation") === EDIT
  )
}

export function drawingOf(image: Value | null): Drawing | Refused {
  if (image === null) {
    return { refused: "This picture can't be found any more, so it can't be redrawn." }
  }
  const prompt = textAt(image, "prompt")
  if (prompt === null || prompt.trim() === "") {
    return { refused: "This picture has no prompt saved, so it can't be redrawn." }
  }
  const spec = MODELS[STORY_MODEL]
  const kept = textAt(image, "model") === STORY_MODEL ? image : {}
  return {
    model: STORY_MODEL,
    prompt,
    steps: numberIn(kept, "steps", spec.defaultSteps),
    guidance: numberIn(kept, "guidance", spec.defaultGuidance),
    width: WIDTH,
    height: HEIGHT,
  }
}

export function redrawOf(image: Value | null, look: Looking): Redraw | Refused {
  const drawing = drawingOf(image)
  if ("refused" in drawing || image === null || !madeByEdit(image)) return drawing
  const input = [textAt(image, "inputImage"), look.subjectCover()].find(
    (one): one is string => one?.startsWith(IMAGE_OPENS) === true && look.image(one) !== null
  )
  return input === undefined ? { refused: INPUT_GONE } : { prompt: drawing.prompt, input }
}

export function subjectIn(beats: string, cover: string): string | null {
  for (const line of beats.split("\n")) {
    if (!line.includes(cover)) continue
    const listed = recordIn(line)?.["pictured"]
    if (!Array.isArray(listed)) continue
    for (const one of listed) {
      if (typeof one !== "object" || one === null) continue
      const entry = one as Readonly<Record<string, unknown>>
      const character = entry["character"]
      if (entry["cover"] === cover && typeof character === "string") return character
    }
  }
  return null
}

export async function drawnAt(drawing: Drawing, seed: number): Promise<string> {
  const spec = MODELS[STORY_MODEL]
  const base = baseOf()
  const run = await runComfyGraph({
    baseUrl: base,
    buildGraph: () =>
      buildModelGraph(spec, {
        prompt: drawing.prompt,
        negativePrompt: spec.defaultNegative,
        width: drawing.width,
        height: drawing.height,
        steps: drawing.steps,
        guidance: drawing.guidance,
        seed,
        loraStrength: 1,
        filenamePrefix: "cover-reroll",
      }),
    pollDeadlineMs: DRAWN_WITHIN_MS,
  })
  const png = await fetchImage(base, run.image)
  const made = {
    service: "zimage",
    operation: "generate",
    model: drawing.model,
    prompt: drawing.prompt,
    seed,
    steps: drawing.steps,
    guidance: drawing.guidance,
    width: drawing.width,
    height: drawing.height,
  }
  const landed = await landImage(
    defaultPersistImageDeps(),
    png,
    makingValues(made, () => false),
    []
  )
  return landed.slug
}

export async function editedAt(editing: Editing, seed: number): Promise<string> {
  const bytes = await bytesOfImage(editing.input.slice(IMAGE_OPENS.length))
  const edited = await editedBy({
    bytes,
    ending: `.${endingOf(bytes) ?? "png"}`,
    prompt: editing.prompt,
    seed,
    deadlineMs: DRAWN_WITHIN_MS,
  })
  const made = {
    service: EDIT_SERVICE,
    operation: EDIT,
    model: EDIT_MODEL,
    prompt: editing.prompt,
    seed,
    inputImageSha256: sha256Hex(bytes),
  }
  const landed = await landImage(
    defaultPersistImageDeps(),
    edited,
    makingValues(made, () => true),
    []
  )
  return landed.slug
}

export async function redrawnAs(redraw: Redraw): Promise<string> {
  return "input" in redraw ? await editedAt(redraw, drawSeed()) : await drawnAt(redraw, drawSeed())
}
