import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE739f17b4fa28c69 = {
  id: "01a0c5f3-8d0f-7fc9-992d-08be11fad3eb",
  type: "page-type/image",
  slug: "image-e739f17b4fa28c69",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, standing upright in a shallow steamy traditional public bathhouse pool, nude, the warm water low at hip level so their full torsos and hips are well above the waterline, leaning close and looking at one another in candid conversation, relaxed serene expressions, soft natural light, faint rising steam in the background, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 969,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FFF",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/hot-spring", "setting-tag/outdoor", "setting-tag/water"],
  poseTags: ["pose-tag/bathing", "pose-tag/face-to-face"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
