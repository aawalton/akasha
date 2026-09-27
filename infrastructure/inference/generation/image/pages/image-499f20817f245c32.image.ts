import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image499f20817f245c32 = {
  id: "019f57df-b2a1-7383-9276-0a3fe81e431e",
  type: "page-type/image",
  slug: "image-499f20817f245c32",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "tomboyish woman in a white crop top and high-waisted ripped jeans, hands in back pockets with a tongue-in-teeth grin, graffiti alley, hard afternoon sun, photorealistic photograph, natural skin texture, film grain",
  seed: 1131481022,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/outdoor", "setting-tag/city", "setting-tag/city-street"],
  poseTags: ["pose-tag/standing", "pose-tag/tongue-out", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/tank-top", "wardrobe-tag/jeans", "wardrobe-tag/crop-top"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
