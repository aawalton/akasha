import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFbd2d3cd905495ab = {
  id: "01a0c5f4-1912-7acb-87bb-b02b5ae02edf",
  type: "page-type/image",
  slug: "image-fbd2d3cd905495ab",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman at a distance, small in the frame, full body walking across a large open city plaza at a three-quarter angle, overcast soft daylight, wide architectural setting. Her face is small but features remain recognizable and consistent with the reference. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic wide environmental photograph, natural proportions, correct anatomy.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
