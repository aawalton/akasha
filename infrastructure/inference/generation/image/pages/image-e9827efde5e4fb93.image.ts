import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE9827efde5e4fb93 = {
  id: "01a0c5f3-7a9b-7c8a-af94-c95047889a64",
  type: "page-type/image",
  slug: "image-e9827efde5e4fb93",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, standing upright in a shallow steamy traditional public bathhouse pool, nude, the warm water low at hip level so their full torsos and hips are above the waterline, the woman in the center tipping her head back with her eyes closed and her mouth slightly open in pleasure, the two women on either side leaning in to kiss the sides of her neck, intimate sensual mood, soft natural light, faint rising steam in the background, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 2424,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FFF",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/hot-spring", "setting-tag/water", "setting-tag/indoor"],
  poseTags: ["pose-tag/kissing", "pose-tag/bathing", "pose-tag/eyes-closed"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
