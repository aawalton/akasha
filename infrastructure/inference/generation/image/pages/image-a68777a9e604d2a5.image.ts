import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA68777a9e604d2a5 = {
  id: "01a0e988-20f3-7e01-88a7-de1956457ef6",
  type: "page-type/image",
  slug: "image-a68777a9e604d2a5",
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
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She lies on her back in tall uncut grass on a hilltop in a park, arms stretched lazily above her head, one knee raised, hair fanned out in the grass, gazing up in wonder at huge white cumulus clouds drifting across a deep blue sky, lips parted. She wears a white crochet bikini, the top slightly askew, and a stack of beaded bracelets; the tall grass half-hides her body. Camera low at grass level from beside her head, grass blades blurred in the foreground, bright breezy afternoon. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
