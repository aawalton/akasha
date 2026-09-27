import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71cba3f02b231d34 = {
  id: "01a0c5f3-b3ca-7c46-bf0d-3b98f9048749",
  type: "page-type/image",
  slug: "image-71cba3f02b231d34",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "genuinely blushing woman in an off-shoulder cottage dress tucking hair behind her ear and glancing away, wildflower meadow, photorealistic photograph, natural skin texture, film grain",
  seed: 1900187519,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/field", "setting-tag/outdoor", "setting-tag/nature"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-away", "pose-tag/hand-on-face"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/off-shoulder", "wardrobe-tag/puffed-sleeves"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
