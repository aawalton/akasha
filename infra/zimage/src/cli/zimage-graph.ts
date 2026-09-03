import type { ComfyGraph } from "@akasha/comfy/comfy-graph"
import type { ModelSpec } from "./models"

export const ZIMAGE_DEFAULT_WIDTH = 1024
export const ZIMAGE_DEFAULT_HEIGHT = 1024

export interface RenderParams {
  readonly prompt: string
  readonly negativePrompt: string
  readonly width: number
  readonly height: number
  readonly steps: number
  readonly guidance: number
  readonly seed: number
  readonly loraName?: string
  readonly loraStrength: number
  readonly filenamePrefix: string
}

export function buildModelGraph(spec: ModelSpec, p: RenderParams): ComfyGraph {
  const loraPresent = p.loraName !== undefined
  const patchModelSource: readonly [string, number] = loraPresent ? ["61", 0] : ["66", 0]

  return {
    "66": {
      class_type: "UNETLoader",
      inputs: { unet_name: spec.unetFile, weight_dtype: "default" },
    },
    ...(loraPresent
      ? {
          "61": {
            class_type: "LoraLoaderModelOnly",
            inputs: {
              model: ["66", 0],
              lora_name: p.loraName ?? "",
              strength_model: p.loraStrength,
            },
          },
        }
      : {}),
    "70": {
      class_type: "ModelSamplingAuraFlow",
      inputs: { model: patchModelSource, shift: spec.modelShift },
    },
    "62": {
      class_type: "CLIPLoader",
      inputs: { clip_name: spec.clipFile, type: spec.clipType, device: "default" },
    },
    "63": { class_type: "VAELoader", inputs: { vae_name: spec.vaeFile } },
    "67": { class_type: "CLIPTextEncode", inputs: { clip: ["62", 0], text: p.prompt } },
    "71": { class_type: "CLIPTextEncode", inputs: { clip: ["62", 0], text: p.negativePrompt } },
    "68": {
      class_type: "EmptySD3LatentImage",
      inputs: { width: p.width, height: p.height, batch_size: 1 },
    },
    "69": {
      class_type: "KSampler",
      inputs: {
        model: ["70", 0],
        positive: ["67", 0],
        negative: ["71", 0],
        latent_image: ["68", 0],
        seed: p.seed,
        steps: p.steps,
        cfg: p.guidance,
        sampler_name: spec.samplerName,
        scheduler: spec.scheduler,
        denoise: 1,
      },
    },
    "65": { class_type: "VAEDecode", inputs: { samples: ["69", 0], vae: ["63", 0] } },
    "9": {
      class_type: "SaveImage",
      inputs: { images: ["65", 0], filename_prefix: p.filenamePrefix },
    },
  }
}
