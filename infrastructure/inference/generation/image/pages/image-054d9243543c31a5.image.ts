import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image054d9243543c31a5 = {
  id: "01a0c5f3-8d10-7b7b-8f30-1afa79b9b4d0",
  type: "page-type/image",
  slug: "image-054d9243543c31a5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman backlit by a warm setting sun, rim light tracing her body's edge, dust in the air, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 408686402,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/outdoor", "setting-tag/field", "setting-tag/sunset"],
  poseTags: ["pose-tag/standing", "pose-tag/back-view", "pose-tag/looking-back"],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
