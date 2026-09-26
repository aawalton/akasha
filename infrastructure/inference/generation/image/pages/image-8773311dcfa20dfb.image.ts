import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8773311dcfa20dfb = {
  id: "01a0c5f4-03a7-789d-af2f-7fb47d5fed7f",
  type: "page-type/image",
  slug: "image-8773311dcfa20dfb",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman seen from directly behind, full body, walking away from the camera down a tree-lined path in a park, natural daylight. Preserve her exact hair color length and style, her build and skin tone — same person as the reference image, only now viewed from the back so her face is not visible. Photorealistic candid photograph, natural proportions, correct anatomy, two arms two legs.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
} as const satisfies Image
