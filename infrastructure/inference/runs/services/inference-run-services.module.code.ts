import { z } from "zod"

export const INFERENCE_RUN_PAGE_TYPE_SLUG = "inference-run"

export const INFERENCE_SERVICES = [
  "image-gen",
  "image-edit-nano-banana",
  "seedvr2-upscale",
  "qwen3-tts",
  "voxcpm2",
  "moss-tts",
  "mlx-vlm",
  "wan-i2v",
  "music-gen",
  "segment-rembg",
] as const
export type InferenceService = (typeof INFERENCE_SERVICES)[number]

export const INFERENCE_OPERATIONS = [
  "generate",
  "edit",
  "upscale",
  "voice-design",
  "voice-clone",
  "video-qa",
  "i2v",
  "i2v-extend",
  "music",
  "segment",
] as const
export type InferenceOperation = (typeof INFERENCE_OPERATIONS)[number]

export const ServiceVersionsSchema = z
  .object({
    mlxOpenaiServer: z.string(),
    mflux: z.string(),
    mlx: z.string(),
    mlxMetal: z.string(),
    quantize: z.number(),
    mlxVlm: z.string(),
    torch: z.string(),
    torchVision: z.string(),
    torchAudio: z.string(),
    comfyui: z.string(),
    comfyuiGguf: z.string(),
    seedvr2Node: z.string(),
    mlxAudio: z.string(),
    comfyuiVideoHelperSuite: z.string(),
    aceStep: z.string(),
    diffusers: z.string(),
    transformers: z.string(),
    accelerate: z.string(),
    bitsandbytes: z.string(),
    rembg: z.string(),
    onnxruntime: z.string(),
    fastapi: z.string(),
  })
  .partial()
export type ServiceVersions = z.infer<typeof ServiceVersionsSchema>

export const SERVICE_VERSIONS: Record<InferenceService, ServiceVersions> = {
  "image-gen": { mlxOpenaiServer: "1.8.1", mlx: "0.31.0", mlxMetal: "0.31.0", quantize: 8 },
  "image-edit-nano-banana": {},
  "seedvr2-upscale": {
    torch: "2.9.1",
    torchVision: "0.24.1",
    torchAudio: "2.9.1",
    comfyui: "28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    comfyuiGguf: "6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    seedvr2Node: "5a4bf428f3735cc72ac760d40f372f94dec28422",
  },
  "qwen3-tts": { mlxAudio: "0.4.3" },
  voxcpm2: { mlxAudio: "0.4.4", mlx: "0.31.2" },
  "moss-tts": { mlxAudio: "0.4.4", mlx: "0.31.2" },
  "mlx-vlm": { mlxVlm: "0.6.3", mlx: "0.31.2", mlxMetal: "0.31.2", quantize: 4 },
  "wan-i2v": {
    torch: "2.9.1",
    torchVision: "0.24.1",
    torchAudio: "2.9.1",
    comfyui: "28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    comfyuiGguf: "6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    comfyuiVideoHelperSuite: "4ee72c065db22c9d96c2427954dc69e7b908444b",
  },
  "music-gen": { aceStep: "dce621408bee8c31b4fcf4811682eb9359e1bc94", mlx: "0.31.2" },
  "segment-rembg": { rembg: "2.0.67", fastapi: "0.118.0", onnxruntime: "1.22.0" },
}
