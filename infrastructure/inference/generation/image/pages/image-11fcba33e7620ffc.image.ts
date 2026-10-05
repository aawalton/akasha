import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11fcba33e7620ffc = {
  id: "01a10d4a-ee8d-7868-8d22-a3c86cfa45f7",
  type: "page-type/image",
  slug: "image-11fcba33e7620ffc",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-7a41b7be99fc25da",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Remove the headband completely. Her furry rabbit ears grow directly out of her head through her hair, the fur at the base of each ear blending into her scalp, with no band, no clip and no accessory. Keep everything else exactly the same: her face, body, pose, clothing, tail, setting and lighting.",
} as const satisfies Image
