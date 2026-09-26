import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image151a27ba569fad8f = {
  id: "019f057e-4a17-7755-a7fd-77fedbf4ff9e",
  type: "page-type/image",
  slug: "image-151a27ba569fad8f",
  title: "Ali — wallpaper L01 (Experimenting)",
  esoDay: "2026-07-05",
  relationshipLevel: "closeness-level/level-1",
  service: "seedvr2-upscale",
  operation: "upscale",
  model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
  seed: 12345,
  resolution: "1440",
  inputImage: "image/image-3e1cb06c36ab04fd",
  serviceVersions: [
    "torch 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    "torch-audio 2.9.1",
    "comfyui-gguf 6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    "seedvr2-node 5a4bf428f3735cc72ac760d40f372f94dec28422",
    "torch-vision 0.24.1",
  ],
} as const satisfies Image
