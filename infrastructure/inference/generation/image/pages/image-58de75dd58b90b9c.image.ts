import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58de75dd58b90b9c = {
  id: "019f57d2-7f10-7340-909f-6123890c88b7",
  type: "page-type/image",
  slug: "image-58de75dd58b90b9c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "chic woman in a classic little black dress and pearls, crossing her legs on a velvet chaise with a knowing smirk, jazz lounge, low amber light, photorealistic photograph, natural skin texture, film grain",
  seed: 1931280045,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/indoor", "setting-tag/living-room", "setting-tag/dimly-lit"],
  poseTags: ["pose-tag/sitting", "pose-tag/legs-crossed", "pose-tag/looking-away"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/sleeveless", "wardrobe-tag/jewelry"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
