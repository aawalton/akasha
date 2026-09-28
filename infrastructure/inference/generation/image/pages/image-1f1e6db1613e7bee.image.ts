import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1f1e6db1613e7bee = {
  id: "01a0e989-64d5-724c-b498-e2f563705619",
  type: "page-type/image",
  slug: "image-1f1e6db1613e7bee",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-252ed27a3e5ff748",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and her skin tone exactly as in the reference; add nothing she does not have. She lies on her back on a soft blanket in the tall grass on a hilltop in a park, arms stretched lazily above her head, one bare knee raised, her hair fanned out, gazing up in wonder at huge white clouds drifting across a deep blue sky. She wears a white crochet bikini and a stack of beaded bracelets, barefoot. Camera from beside her at a low three-quarter angle showing her face and body clearly, bright breezy afternoon. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
