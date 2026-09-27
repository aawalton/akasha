import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f59915e11e97f07 = {
  id: "01a0c5f4-03a7-7327-958a-4aa57f95e338",
  type: "page-type/image",
  slug: "image-5f59915e11e97f07",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Recompose this exact same woman seen from behind in a rear three-quarter view, full body, standing at a scenic hilltop overlook gazing out at the valley, warm golden-hour light. Her face is mostly turned away, barely visible. Preserve her exact hair color, length and style, her build and skin tone — same person as the reference image. Photorealistic candid photograph, natural proportions, correct anatomy.",
  inputImage: "image/image-2cd145459966657a",
  referenceImages: ["image/image-2cd145459966657a"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: [
    "setting-tag/outdoor",
    "setting-tag/mountains",
    "setting-tag/nature",
    "setting-tag/sunset",
  ],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/profile",
    "pose-tag/looking-away",
    "pose-tag/back-view",
  ],
  wardrobeTags: ["wardrobe-tag/jeans", "wardrobe-tag/shirt", "wardrobe-tag/long-sleeves"],
} as const satisfies Image
