import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEd41e1d73e4a1f73 = {
  id: "01a0e961-9c4d-77ac-a371-76cf939585ea",
  type: "page-type/image",
  slug: "image-ed41e1d73e4a1f73",
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
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. She lies face-down on a black blanket at the edge of a still pond in a park, chin resting on her folded arms, eyes half-closed and dreamy, gazing off across the water, not at the camera. Her bare back is to the sun, a dark towel draped over her hips, her chest pressed hidden against the blanket. Side profile camera at grass level, willow branches trailing into the water behind her, warm low golden-hour light. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
