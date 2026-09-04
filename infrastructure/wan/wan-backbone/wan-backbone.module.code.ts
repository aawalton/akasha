import type { ComfyNode } from "@akasha/comfy/comfy-graph"

export const WAN_HIGH_NOISE_UNET = "Wan2.2-I2V-A14B-HighNoise-Q5_K_M.gguf"
export const WAN_LOW_NOISE_UNET = "Wan2.2-I2V-A14B-LowNoise-Q5_K_M.gguf"
export const WAN_HIGH_NOISE_UNET_LIGHTNING = "Wan2.2-I2V-A14B-HighNoise-Q3_K_M.gguf"
export const WAN_LOW_NOISE_UNET_LIGHTNING = "Wan2.2-I2V-A14B-LowNoise-Q3_K_M.gguf"
export const WAN_TEXT_ENCODER = "umt5_xxl_fp8_e4m3fn_scaled.safetensors"
export const WAN_VAE = "wan_2.1_vae.safetensors"
export const WAN_LIGHTNING_LORA_HIGH =
  "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1-high_noise.safetensors"
export const WAN_LIGHTNING_LORA_LOW =
  "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1-low_noise.safetensors"

export const WAN_FULL_STEPS = 20
export const WAN_LIGHTNING_STEPS = 4
export const WAN_FULL_CFG = 3.5
export const WAN_LIGHTNING_CFG = 1.0
export const WAN_MODEL_SHIFT = 8.0
export const WAN_FPS = 16
export const WAN_DEFAULT_WIDTH = 1280
export const WAN_DEFAULT_HEIGHT = 720
export const WAN_DEFAULT_FRAMES = 81

export const WAN_DEFAULT_NEGATIVE_PROMPT =
  "色调艳丽，过曝，静态，细节模糊不清，字幕，风格，作品，画作，画面，静止，整体发灰，最差质量，低质量，JPEG压缩残留，丑陋的，残缺的，多余的手指，画得不好的手部，画得不好的脸部，畸形的，毁容的，形态畸形的肢体，手指融合，静止不动的画面，杂乱的背景，三条腿，背景人很多，倒着走"

export function expertBoundary(steps: number): number {
  return Math.round(steps / 2)
}

export interface WanBackboneParams {
  readonly prompt: string
  readonly negativePrompt: string
  readonly seed: number
  readonly steps: number
  readonly lightning: boolean
  readonly filenamePrefix: string
}

export function buildWanBackbone(p: WanBackboneParams): Readonly<Record<string, ComfyNode>> {
  const cfg = p.lightning ? WAN_LIGHTNING_CFG : WAN_FULL_CFG
  const boundary = expertBoundary(p.steps)
  const highModelSource: readonly [string, number] = p.lightning ? ["10", 0] : ["1", 0]
  const lowModelSource: readonly [string, number] = p.lightning ? ["11", 0] : ["2", 0]
  const highUnet = p.lightning ? WAN_HIGH_NOISE_UNET_LIGHTNING : WAN_HIGH_NOISE_UNET
  const lowUnet = p.lightning ? WAN_LOW_NOISE_UNET_LIGHTNING : WAN_LOW_NOISE_UNET

  return {
    "1": { class_type: "UnetLoaderGGUF", inputs: { unet_name: highUnet } },
    "2": { class_type: "UnetLoaderGGUF", inputs: { unet_name: lowUnet } },
    "3": {
      class_type: "CLIPLoader",
      inputs: { clip_name: WAN_TEXT_ENCODER, type: "wan", device: "default" },
    },
    "4": { class_type: "VAELoader", inputs: { vae_name: WAN_VAE } },
    "7": { class_type: "CLIPTextEncode", inputs: { clip: ["3", 0], text: p.prompt } },
    "8": { class_type: "CLIPTextEncode", inputs: { clip: ["3", 0], text: p.negativePrompt } },
    ...(p.lightning
      ? {
          "10": {
            class_type: "LoraLoaderModelOnly",
            inputs: {
              model: ["1", 0],
              lora_name: WAN_LIGHTNING_LORA_HIGH,
              strength_model: 1.0,
            },
          },
          "11": {
            class_type: "LoraLoaderModelOnly",
            inputs: {
              model: ["2", 0],
              lora_name: WAN_LIGHTNING_LORA_LOW,
              strength_model: 1.0,
            },
          },
        }
      : {}),
    "12": {
      class_type: "ModelSamplingSD3",
      inputs: { model: highModelSource, shift: WAN_MODEL_SHIFT },
    },
    "13": {
      class_type: "ModelSamplingSD3",
      inputs: { model: lowModelSource, shift: WAN_MODEL_SHIFT },
    },
    "14": {
      class_type: "KSamplerAdvanced",
      inputs: {
        model: ["12", 0],
        positive: ["9", 0],
        negative: ["9", 1],
        latent_image: ["9", 2],
        add_noise: "enable",
        noise_seed: p.seed,
        steps: p.steps,
        cfg,
        sampler_name: "euler",
        scheduler: "simple",
        start_at_step: 0,
        end_at_step: boundary,
        return_with_leftover_noise: "enable",
      },
    },
    "15": {
      class_type: "KSamplerAdvanced",
      inputs: {
        model: ["13", 0],
        positive: ["9", 0],
        negative: ["9", 1],
        latent_image: ["14", 0],
        add_noise: "disable",
        noise_seed: 0,
        steps: p.steps,
        cfg,
        sampler_name: "euler",
        scheduler: "simple",
        start_at_step: boundary,
        end_at_step: p.steps,
        return_with_leftover_noise: "disable",
      },
    },
    "16": { class_type: "VAEDecode", inputs: { samples: ["15", 0], vae: ["4", 0] } },
    "17": { class_type: "CreateVideo", inputs: { images: ["16", 0], fps: WAN_FPS } },
    "18": {
      class_type: "SaveVideo",
      inputs: { video: ["17", 0], filename_prefix: p.filenamePrefix, format: "mp4", codec: "h264" },
    },
  }
}
