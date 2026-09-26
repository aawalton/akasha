import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e6de5b900f421a4 = {
  id: "01a0c673-50d0-77fd-ae62-23bfc8ccd5a9",
  type: "page-type/image",
  slug: "image-9e6de5b900f421a4",
  service: "seedvr2-upscale",
  operation: "upscale",
  model: "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16",
  seed: 12345,
  resolution: "256",
  inputImage: "image/image-dc234e7e945badda",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
    "comfyui-gguf 6ea2651e7df66d7585f6ffee804b20e92fb38b8a",
    "seedvr2-node 5a4bf428f3735cc72ac760d40f372f94dec28422",
  ],
} as const satisfies Image
