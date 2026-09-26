import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c4c2e0461db2c3b = {
  id: "01a0c5f4-03a7-7bd5-8a67-6c924cafa002",
  type: "page-type/image",
  slug: "image-6c4c2e0461db2c3b",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman at a distance, small in the frame, full body standing in a wide open grassy park meadow facing the camera, natural daylight, lots of environment around her. Her face is small but her features remain recognizable and consistent with the reference. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic wide environmental photograph, natural proportions, correct anatomy.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
