import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2bdb2c71b3f616cd = {
  id: "019f57e2-f87c-72f8-af74-2636d48246d7",
  type: "page-type/image",
  slug: "image-2bdb2c71b3f616cd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "country woman in a tied gingham shirt and denim cutoffs leaning on a pickup truck, easy grin, dusty farm road at golden hour, photorealistic photograph, natural skin texture, film grain",
  seed: 735193680,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/outdoor", "setting-tag/car"],
  poseTags: ["pose-tag/leaning", "pose-tag/standing", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/shirt", "wardrobe-tag/jeans", "wardrobe-tag/boots"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
