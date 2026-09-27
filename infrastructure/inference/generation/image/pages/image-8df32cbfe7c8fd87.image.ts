import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8df32cbfe7c8fd87 = {
  id: "01a0c5f3-9f6e-7920-89ca-60f921eff932",
  type: "page-type/image",
  slug: "image-8df32cbfe7c8fd87",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, in a steamy traditional public bathhouse, bathing nude in a warm stone hot-spring pool, water and rising steam naturally obscuring their bodies, sitting close and looking at one another in candid conversation, relaxed serene expressions, soft natural light through atmospheric mist, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 606,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FFF",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/hot-spring", "setting-tag/outdoor", "setting-tag/water"],
  poseTags: ["pose-tag/sitting", "pose-tag/chatting", "pose-tag/face-to-face"],
  wardrobeTags: ["wardrobe-tag/topless"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
