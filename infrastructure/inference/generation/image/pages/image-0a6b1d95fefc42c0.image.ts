import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0a6b1d95fefc42c0 = {
  id: "01a0e98b-f5bc-76ec-a52d-725021bea634",
  type: "page-type/image",
  slug: "image-0a6b1d95fefc42c0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-40fcb658abfc5567",
  title: "Rhia Singing to Her Lap Harp",
  persona: "persona/rhia",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits cross-legged on a silver-blue blanket near a weeping willow in a park, a small wooden lap harp held upright against her chest, which it covers, plucking the strings and singing softly with her eyes closed and head tilted. A pale blue silk kimono robe hangs open and has slipped off both shoulders to her elbows, her shoulders and upper back bare, silver hoop earrings. Side profile camera at seated height, soft late-afternoon light filtering through the willow fronds. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
