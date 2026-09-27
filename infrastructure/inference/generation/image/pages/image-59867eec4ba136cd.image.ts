import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image59867eec4ba136cd = {
  id: "01a0c5f2-eb24-712a-900c-01ba8477551d",
  type: "page-type/image",
  slug: "image-59867eec4ba136cd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman relaxing in a warm bath, shoulders above the water, soft candlelight, eyes closed in calm contentment, steam in the air, tasteful and serene, 50mm, soft warm glow, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: [
    "setting-tag/bathroom",
    "setting-tag/bathtub",
    "setting-tag/candlelight",
    "setting-tag/hot-spring",
  ],
  poseTags: ["pose-tag/reclining", "pose-tag/eyes-closed", "pose-tag/smiling", "pose-tag/bathing"],
  wardrobeTags: ["wardrobe-tag/nude", "wardrobe-tag/topless"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
