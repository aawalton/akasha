import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e2030e1fac50290 = {
  id: "01a0e971-e712-7007-a3fe-62021ff36f8d",
  type: "page-type/image",
  slug: "image-1e2030e1fac50290",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-694a93c5b38a798c",
  title: "Ceri Laughing Among the Dandelions",
  persona: "persona/ceri",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. Caught candid mid-roll on a yellow-and-white striped towel on a sunny park lawn, she is rolling onto her side laughing helplessly, eyes squeezed shut, head thrown back, one arm clamped across her chest covering it. She wears only a loosened floral sarong knotted at her hip and a pink hibiscus flower tucked behind her ear; dandelion seed heads drift in the air around her. Wide shot from a little distance with the park around her, bright cheerful early-afternoon light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
