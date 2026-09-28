import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8744e3a64d6feaf7 = {
  id: "01a0e9a0-525a-7bff-be72-1b9b79a2c0c9",
  type: "page-type/image",
  slug: "image-8744e3a64d6feaf7",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d30da57708d85cb6",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She lies on her stomach across a low sun-warmed stone wall at the edge of a park flower garden, one arm dangling lazily toward the lavender below, cheek resting on her other forearm, eyes half-closed and content like a cat in the sun. She wears only a pair of loose rolled-up linen shorts and a scatter of thin silver toe rings and ankle chains; her bare back is to the sun and her chest is pressed hidden against the stone. Camera low from the garden side, three-quarter angle, warm mid-afternoon light, bees and lavender in the foreground blur. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
