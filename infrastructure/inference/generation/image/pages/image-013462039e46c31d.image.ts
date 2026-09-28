import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image013462039e46c31d = {
  id: "01a0e973-9cab-7c4f-86e3-1412c183aa11",
  type: "page-type/image",
  slug: "image-013462039e46c31d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b76ab03f19af0c86",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies curled on her side on a moss-green blanket in a quiet corner of a park beside a mossy old stone wall and ferns, wearing big over-ear headphones, eyes closed, lost in listening to an audiobook, a faint smile. Her green silk slip dress has its straps fallen and is pushed down to her waist; her knees are drawn up and her arms folded against her chest, hiding it, a thin silver bracelet at her wrist. Close crop from above at her face and shoulders, cool dappled light through leaves. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
