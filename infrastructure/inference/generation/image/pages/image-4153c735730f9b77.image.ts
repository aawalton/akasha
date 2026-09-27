import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4153c735730f9b77 = {
  id: "01a0c5f2-eb21-7e38-b0fc-d13704f30195",
  type: "page-type/image",
  slug: "image-4153c735730f9b77",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in front of a massive Iceland waterfall, casual rain jacket, dramatic moody light, awed expression, misty spray in the air, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: [
    "setting-tag/waterfall",
    "setting-tag/outdoor",
    "setting-tag/nature",
    "setting-tag/rocks",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/looking-up", "pose-tag/portrait"],
  wardrobeTags: ["wardrobe-tag/jacket", "wardrobe-tag/backpack"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
