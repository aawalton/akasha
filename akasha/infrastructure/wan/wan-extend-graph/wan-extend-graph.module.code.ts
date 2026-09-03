import type { ComfyGraph, ComfyNode } from "@akasha/comfy/comfy-graph"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { buildWanBackbone } from "../wan-backbone/wan-backbone.module.code.ts"

export type ExtendDirection = "forward" | "back"

export function resolveComfyInputName(basename: string): string {
  return `input/${basename}`
}

export function snapToVaeLength(length: number): number {
  if (length <= 1) return 1
  const remainder = (length - 1) % 4
  return remainder === 0 ? length : length + (4 - remainder)
}

export function computeSkipFirstFrames(
  direction: ExtendDirection,
  totalFrames: number,
  contextFrames: number
): number {
  switch (direction) {
    case "forward":
      return totalFrames - contextFrames
    case "back":
      return 0
    default:
      return assertNever(direction)
  }
}

export interface ExtendGraphParams {
  readonly contextVideoName: string
  readonly direction: ExtendDirection
  readonly skipFirstFrames: number
  readonly contextFrames: number
  readonly length: number
  readonly prompt: string
  readonly negativePrompt: string
  readonly width: number
  readonly height: number
  readonly seed: number
  readonly steps: number
  readonly lightning: boolean
  readonly filenamePrefix: string
}

export function buildExtendGraph(p: ExtendGraphParams): ComfyGraph {
  const vhsNode: ComfyNode = {
    class_type: "VHS_LoadVideoPath",
    inputs: {
      video: p.contextVideoName,
      force_rate: 0,
      custom_width: p.width,
      custom_height: p.height,
      frame_load_cap: p.contextFrames,
      skip_first_frames: p.skipFirstFrames,
      select_every_nth: 1,
    },
  }

  const isForward = p.direction === "forward"
  const vhsNodeId = isForward ? "5" : "6"
  const anchorInput: Readonly<Record<string, ComfyNode["inputs"][string]>> = isForward
    ? { start_image: [vhsNodeId, 0] }
    : { end_image: [vhsNodeId, 0] }

  const conditioning: ComfyNode = {
    class_type: "WanFirstLastFrameToVideo",
    inputs: {
      positive: ["7", 0],
      negative: ["8", 0],
      vae: ["4", 0],
      ...anchorInput,
      width: p.width,
      height: p.height,
      length: p.length,
      batch_size: 1,
    },
  }

  return {
    ...buildWanBackbone({
      prompt: p.prompt,
      negativePrompt: p.negativePrompt,
      seed: p.seed,
      steps: p.steps,
      lightning: p.lightning,
      filenamePrefix: p.filenamePrefix,
    }),
    [vhsNodeId]: vhsNode,
    "9": conditioning,
  }
}
