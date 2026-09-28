import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image13e312464e8d2124 = {
  id: "01a0e9a4-0d0d-71f9-bdfe-d98dab4587f5",
  type: "page-type/image",
  slug: "image-13e312464e8d2124",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ec0e2bb40b74cfa7",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits on a paint-spattered canvas drop cloth on a sunny park lawn with her very long golden hair unbound and pooled all around her in the grass, painting a small watercolor of the park on a board propped against her knees, a brush in her hand and a tin of paints beside her, looking at the painting in concentration. She wears only a pair of paint-smeared denim cut-offs; her long hair falls forward over her shoulders and chest, covering it, a smudge of blue paint on her cheek. Camera three-quarter from the front at seated height, soft bright late-morning light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
