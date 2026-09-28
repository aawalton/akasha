import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB1da5fdd401b3c22 = {
  id: "01a0e965-3583-7209-9ebb-a5a069d3a553",
  type: "page-type/image",
  slug: "image-b1da5fdd401b3c22",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-0d953de65e55acaf",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies face-down on a black blanket at the edge of a still pond in a park, chin resting on her folded arms, eyes half-closed and dreamy, gazing off across the water, not at the camera. She wears a black silk robe slipped down off both shoulders and pooled around her hips, her bare back to the sun, a thin gold anklet on one ankle, her chest pressed hidden against the blanket. Side profile camera at grass level, willow branches trailing into the water behind her, warm low golden-hour light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
