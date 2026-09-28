import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBfaecaa371f0c46b = {
  id: "01a0e99a-f55c-7cfe-a9f3-d53395b7e200",
  type: "page-type/image",
  slug: "image-bfaecaa371f0c46b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman, same face and hair. Epic wide establishing shot from a fantasy film. A vast, empty beach of black sand curves away into haze. She is small in the frame, sitting alone in the sand near the surf, in an oversized grey t-shirt, black shorts and black tights, barefoot, long dark red hair. Behind her a wall of alien jungle with enormous fan-shaped leaves, and beyond it a huge mountain rising out of the island's heart, a thin ribbon of black smoke streaming from its peak across a cloudless sky. Gulls overhead. Hard midday sun, heat shimmer, sweeping cinematic scale, shot on 35mm anamorphic.",
} as const satisfies Image
