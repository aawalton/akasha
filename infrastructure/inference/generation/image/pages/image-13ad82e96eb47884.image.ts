import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image13ad82e96eb47884 = {
  id: "01a0c5f3-b3c9-7544-9deb-db22ee67eda0",
  type: "page-type/image",
  slug: "image-13ad82e96eb47884",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three women in their twenties in a yoga class on mats in a sunlit studio, an instructor guiding the pose, fitted yoga wear, peaceful focused mood, candid 35mm lifestyle photograph",
  seed: 414608111,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FFF",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/indoor", "setting-tag/studio"],
  poseTags: ["pose-tag/stretching", "pose-tag/reclining", "pose-tag/kneeling"],
  wardrobeTags: ["wardrobe-tag/sports-bra", "wardrobe-tag/leggings", "wardrobe-tag/athletic-wear"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
