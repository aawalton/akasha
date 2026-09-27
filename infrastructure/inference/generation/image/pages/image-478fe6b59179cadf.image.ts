import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image478fe6b59179cadf = {
  id: "01a0c5f4-03a3-7624-87ea-c23223095fcc",
  type: "page-type/image",
  slug: "image-478fe6b59179cadf",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full body in frame, two nude adult Korean women on a bed, one lying on top of the other, face to face and kissing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 906829457,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/bedroom", "setting-tag/indoor"],
  poseTags: [
    "pose-tag/kissing",
    "pose-tag/lying-on-stomach",
    "pose-tag/face-to-face",
    "pose-tag/holding-hands",
  ],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
