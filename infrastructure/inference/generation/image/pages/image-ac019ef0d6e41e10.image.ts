import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAc019ef0d6e41e10 = {
  id: "01a0c5f4-03a7-79f7-9dbd-46d99576604b",
  type: "page-type/image",
  slug: "image-ac019ef0d6e41e10",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman seen from behind, full body, walking away across wet sand at the edge of a beach at sunset, gentle waves, warm backlight. Face not visible. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic candid photograph, natural proportions, correct anatomy.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/beach", "setting-tag/ocean", "setting-tag/sunset"],
  poseTags: ["pose-tag/walking", "pose-tag/back-view"],
  wardrobeTags: ["wardrobe-tag/barefoot", "wardrobe-tag/shirt", "wardrobe-tag/pants"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
