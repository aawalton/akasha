import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image18906d5a2a89947c = {
  id: "01a0c5f2-eb24-7529-8b37-146753293aec",
  type: "page-type/image",
  slug: "image-18906d5a2a89947c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning against a kitchen counter, wearing a cute short skirt and a tight cropped t-shirt, soft morning light, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-3",
  settingTags: ["setting-tag/kitchen", "setting-tag/indoor", "setting-tag/daytime"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/leaning",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
  ],
  wardrobeTags: ["wardrobe-tag/t-shirt", "wardrobe-tag/skirt", "wardrobe-tag/bare-legs"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
