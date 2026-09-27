import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71b0bf7f2f20bbf3 = {
  id: "01a0c5f2-eb1f-7225-bd50-5ed3bc47d64b",
  type: "page-type/image",
  slug: "image-71b0bf7f2f20bbf3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a lakeside date sitting on a wooden dock, casual sweater and rolled jeans, feet over the water, soft contented smile toward the viewer, calm golden light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/dock",
    "setting-tag/water",
    "setting-tag/outdoor",
    "setting-tag/sunset",
  ],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-back", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/barefoot", "wardrobe-tag/jeans", "wardrobe-tag/sweater"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
