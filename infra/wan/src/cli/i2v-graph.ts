import type { ComfyGraph, ComfyNode } from "@akasha/comfy/comfy-graph"
import { buildWanBackbone } from "./wan-backbone"

export interface I2vGraphParams {
  readonly startImageName?: string
  readonly endImageName?: string
  readonly prompt: string
  readonly negativePrompt: string
  readonly width: number
  readonly height: number
  readonly frames: number
  readonly seed: number
  readonly steps: number
  readonly lightning: boolean
  readonly filenamePrefix: string
}

export function buildI2vGraph(p: I2vGraphParams): ComfyGraph {
  if (p.startImageName === undefined && p.endImageName === undefined) {
    throw new Error("buildI2vGraph requires at least one of startImageName / endImageName")
  }

  const conditioning: ComfyNode = {
    class_type: p.endImageName === undefined ? "WanImageToVideo" : "WanFirstLastFrameToVideo",
    inputs: {
      positive: ["7", 0],
      negative: ["8", 0],
      vae: ["4", 0],
      ...(p.startImageName === undefined ? {} : { start_image: ["5", 0] }),
      ...(p.endImageName === undefined ? {} : { end_image: ["6", 0] }),
      width: p.width,
      height: p.height,
      length: p.frames,
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
    ...(p.startImageName === undefined
      ? {}
      : { "5": { class_type: "LoadImage", inputs: { image: p.startImageName } } }),
    ...(p.endImageName === undefined
      ? {}
      : { "6": { class_type: "LoadImage", inputs: { image: p.endImageName } } }),
    "9": conditioning,
  }
}
