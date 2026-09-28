import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image60e4c6e6ac79c3ca = {
  id: "01a0e96a-4920-70c8-93ce-1b75f6375f85",
  type: "page-type/image",
  slug: "image-60e4c6e6ac79c3ca",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e878aec0e63b6951",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. Finally off the clock, she lies stretched out on her back on a navy striped beach towel in a park, one forearm draped over her eyes against the sun and the other arm resting across her chest, covering it. She wears only a red bikini bottom and gold bangles on her wrist. Her phone lies face-down on the grass beside her next to a sweating iced coffee, and her shoes are kicked off. Side profile camera at hip height, bright hazy midday sun, flower beds blurred behind. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
