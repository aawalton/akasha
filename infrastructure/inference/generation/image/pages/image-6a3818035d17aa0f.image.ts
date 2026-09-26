import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6a3818035d17aa0f = {
  id: "01a0c5f4-03a7-7500-9a82-c51abaafeece",
  type: "page-type/image",
  slug: "image-6a3818035d17aa0f",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman in a rear three-quarter view, full body, standing indoors beside a tall window looking outside, soft diffused daylight, minimalist room. Face mostly turned away. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic candid photograph, natural proportions, correct anatomy.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
