import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image788ab2e93ab54d6a = {
  id: "01a0e96e-67bb-7fb3-9b75-e0c368a0d252",
  type: "page-type/image",
  slug: "image-788ab2e93ab54d6a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b9f2b7ede489c5c3",
  title: "Athena Reading Beneath the Olive Tree",
  persona: "persona/athena",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits upright with her back against the trunk of an old olive tree in a park, legs stretched out and crossed at the ankle, reading a thick hardback book held open against her chest, which hides it. Her white linen sundress is pushed down to her waist, her shoulders and back bare to the sun, a gold cuff bracelet on her upper arm. Eyes on the page, calm and absorbed, not looking at the camera. Camera from the side at seated eye level, soft clear morning light, silver-green leaves dappling her skin. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
