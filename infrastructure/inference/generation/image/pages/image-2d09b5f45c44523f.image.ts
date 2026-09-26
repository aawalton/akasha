import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d09b5f45c44523f = {
  id: "01a0c5f3-7a99-7bb4-983e-1b48e38de117",
  type: "page-type/image",
  slug: "image-2d09b5f45c44523f",
  persona: "persona/shaestrel",
  service: "seedvr2-upscale",
  operation: "upscale",
  model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
  seed: 12345,
  resolution: "1500",
  inputImage: "image/image-87f31936ec13393b",
  serviceVersions: [
    "torch 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    "torch-audio 2.9.1",
    "comfyui-gguf 6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    "seedvr2-node 5a4bf428f3735cc72ac760d40f372f94dec28422",
    "torch-vision 0.24.1",
  ],
} as const satisfies Image
