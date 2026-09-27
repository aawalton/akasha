import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6cb57d61a3087671 = {
  id: "019f1839-077f-706b-983d-55c11e8fbba7",
  type: "page-type/image",
  slug: "image-6cb57d61a3087671",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic ethereal intimate portrait of two young women lovers in a soft tender kiss, one platinum-blonde and one rose-gold, pale luminous skin, bare shoulders, soft pastel light, dreamy and romantic, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80320011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/studio", "setting-tag/indoor"],
  poseTags: ["pose-tag/kissing", "pose-tag/close-up", "pose-tag/profile"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/bare-shoulders"],
} as const satisfies Image
