import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image748a00e9ad205d03 = {
  id: "01a0c5f4-03a7-7ac7-a1a1-901bd86da25b",
  type: "page-type/image",
  slug: "image-748a00e9ad205d03",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman seen from directly behind, full body, walking away from the camera along a busy city sidewalk, bright natural daylight, buildings and pedestrians softly blurred. Face not visible. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic street photograph, natural proportions, correct anatomy, two arms two legs.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
