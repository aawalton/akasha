import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe85f568588789b3 = {
  id: "01a0c5f3-b3c9-75f1-9657-1a4bc68fcfc2",
  type: "page-type/image",
  slug: "image-ce85f568588789b3",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Nebraska personified as a beautiful young woman in her early twenties — sandy-blonde hair loose, simple chambray dress, goldenrod bouquet in hand, rolling Sandhills prairie and a windmill water pump behind her, enormous soft prairie sunset, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1421374135,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/field", "setting-tag/outdoor", "setting-tag/sunset"],
  poseTags: ["pose-tag/standing", "pose-tag/holding-flowers", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/sundress"],
  ethnicityTags: ["ethnicity-tag/white"],
} as const satisfies Image
