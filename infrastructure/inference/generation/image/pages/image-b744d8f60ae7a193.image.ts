import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB744d8f60ae7a193 = {
  id: "01a10738-d478-7931-a4a5-9e4a941ff459",
  type: "page-type/image",
  slug: "image-b744d8f60ae7a193",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8730538525d4f995",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is at the head of the coal wharf, the green barge with geraniums along its cabin roof moored down the line. The quay alone with nobody near: great dark piles of coal and stacked sacks along it, smoke going up from little tin chimneys on the cabin roofs, a few blurred far-off shovellers. Bright early summer morning sun on the coal wharf, long shadows, coal heaps and moored painted barges blurred behind. Nothing lettered. Wide shot, 28mm lens, deep focus.",
} as const satisfies Image
