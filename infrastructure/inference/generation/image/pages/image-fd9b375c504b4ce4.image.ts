import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFd9b375c504b4ce4 = {
  id: "01a0e977-0f5a-7320-9421-2729fe9752e9",
  type: "page-type/image",
  slug: "image-fd9b375c504b4ce4",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b48f74ffc0450306",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits on a red gingham picnic blanket in a park with her knees drawn up to her chest, which hides it, biting into a ripe strawberry with delight, looking down at the bowl of strawberries and a wicker picnic basket beside her. She wears only a gingham bikini bottom and a daisy-chain anklet, with a straw tote and a paperback lying nearby. Camera at a three-quarter front angle slightly above, soft warm early-evening light, a flowering hedge behind. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
