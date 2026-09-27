import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0890e4f624029f93 = {
  id: "01a0c5f2-eb1d-79cc-96f6-4b86bdc61ce0",
  type: "page-type/image",
  slug: "image-0890e4f624029f93",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sharply tailored black tuxedo suit with satin lapels, standing confidently in a modern lounge, dramatic moody light, bold expression, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/indoor", "setting-tag/living-room", "setting-tag/home"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/jacket", "wardrobe-tag/suit", "wardrobe-tag/deep-v-neck"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
