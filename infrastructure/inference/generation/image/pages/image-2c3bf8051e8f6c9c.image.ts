import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2c3bf8051e8f6c9c = {
  id: "01a0e998-4706-7789-ac1b-9530a0749378",
  type: "page-type/image",
  slug: "image-2c3bf8051e8f6c9c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-070d57a5af44b12c",
  title: "Vera Weaving Gold in the Meadow",
  persona: "persona/vera",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She sits cross-legged on a woven wool blanket in a sunny park meadow, working a small wooden lap loom, a long band of gold-threaded weaving spilling from it across her lap and drawn up over her chest, covering it, her bare shoulders and arms in the sun. Her bronze-gold hair is pinned up with strands escaping, a silver torc at her throat, a basket of colored yarn beside her. She looks down at the weaving with quiet focus, not at the camera. Camera from the side at seated height, warm late-afternoon light glinting on the gold thread. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
