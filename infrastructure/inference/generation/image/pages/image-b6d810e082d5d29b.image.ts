import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB6d810e082d5d29b = {
  id: "01a10d49-cdb8-75cc-9fa8-8a4bbe744d06",
  type: "page-type/image",
  slug: "image-b6d810e082d5d29b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-c4fc61fcda543ef0",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Remove the headband completely. Her furry rabbit ears grow directly out of her head through her hair, the fur at the base of each ear blending into her scalp, with no band, no clip and no accessory. Keep everything else exactly the same: her face, body, pose, clothing, tail, setting and lighting.",
} as const satisfies Image
