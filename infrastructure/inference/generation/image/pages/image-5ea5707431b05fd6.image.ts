import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ea5707431b05fd6 = {
  id: "01a0e984-7845-73fd-86c4-32590a2dca5c",
  type: "page-type/image",
  slug: "image-5ea5707431b05fd6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8f525ca4ec992468",
  title: "Natalie Laying Out a Southern Picnic",
  persona: "persona/natalie",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She kneels on a sunny park lawn beside a big wicker picnic basket, happily laying out a spread of home-cooked Southern food: fried chicken, biscuits, a peach cobbler and a jar of sweet tea. She wears only a floral cotton apron tied at her neck and waist, which covers her front, leaving her shoulders, back and sides bare, and a small gold cross necklace. She smiles down at the food with pride, not at the camera. Camera at a three-quarter side angle at kneeling height, warm golden late-afternoon light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
