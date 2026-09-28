import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ac78803ac20a5f0 = {
  id: "01a0e990-a82b-7288-8155-757072e730a0",
  type: "page-type/image",
  slug: "image-8ac78803ac20a5f0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e5d67823c7d0d8fd",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings, wings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She kneels on a white linen cloth in the middle of a wide sunlit park lawn, eyes closed, face tipped up toward the sun in quiet prayer, her hands pressed together at her chest. She wears a white linen sheet wrapped around her body under her arms and knotted at one shoulder, the other shoulder and her upper back bare, and a delicate gold chain with a tiny dove pendant. Wide shot from a low angle, strong warm backlight haloing her hair, long grass glowing gold around her. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
