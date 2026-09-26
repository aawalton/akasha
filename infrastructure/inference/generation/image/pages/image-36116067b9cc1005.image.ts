import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image36116067b9cc1005 = {
  id: "01a0c5f4-03a7-76a3-9fb6-f67d520c992e",
  type: "page-type/image",
  slug: "image-36116067b9cc1005",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman seen from behind, full body, climbing a wide outdoor stone staircase away from the camera, dappled afternoon light. Face not visible. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic candid photograph, natural proportions, correct anatomy, two arms two legs.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
