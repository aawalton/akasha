import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3274152d5f5f3cf2 = {
  id: "01a0c5f3-8d0d-7ce9-bba7-9f97ff761009",
  type: "page-type/image",
  slug: "image-3274152d5f5f3cf2",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a sweet petite spring fae woman, slim slight feminine figure, delicate pink petal wings, long pastel-pink hair with blossoms falling over her, blue eyes, soft warm smile, wearing only scattered cherry blossoms and a thin flowering vine, standing among giant spring flowers, soft warm light and drifting petals, tasteful artful, 35mm full length, photorealistic",
  seed: 855,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/studio", "setting-tag/plain-background"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/barefoot", "wardrobe-tag/bikini", "wardrobe-tag/hair-accessory"],
  fantasyTags: ["fantasy-tag/fairy", "fantasy-tag/pink-hair"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
