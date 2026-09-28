import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf26f318499a607c = {
  id: "01a0e986-5c64-76ae-915e-731d56ddab7e",
  type: "page-type/image",
  slug: "image-bf26f318499a607c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-4f5aee4e3ff38180",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She lies on her stomach on a charcoal-grey blanket in a park, propped on her elbows over a folded newspaper, working a cryptic crossword, the end of a pen caught between her teeth, eyes narrowed at the clues, reading glasses low on her nose. She wears high-waisted black linen trousers and nothing on top, her blouse folded neatly beside her, her bare back to the sun and her chest pressed hidden against the blanket, a slim silver watch on her wrist. Close crop from slightly above and in front, cool clear morning light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
