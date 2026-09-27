import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB55bf9f1541450a2 = {
  id: "01a0c5f3-b3cb-7c6a-b524-cf78c371759a",
  type: "page-type/image",
  slug: "image-b55bf9f1541450a2",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young women relaxing together in a steamy traditional public bathhouse, soft natural light filtering through rising steam, warm stone pool with clear hot water, wrapped in white towels, serene candid expressions, shoulders above the waterline, atmospheric mist, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, cinematic ambiance",
  seed: 11,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FFF",
  relationshipLevel: "closeness-level/level-4",
  settingTags: ["setting-tag/indoor", "setting-tag/bathtub", "setting-tag/hot-spring"],
  poseTags: ["pose-tag/sitting", "pose-tag/side-by-side", "pose-tag/looking-away"],
  wardrobeTags: ["wardrobe-tag/towel", "wardrobe-tag/partial-undress"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
