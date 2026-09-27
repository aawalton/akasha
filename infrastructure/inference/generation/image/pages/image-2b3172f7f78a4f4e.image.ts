import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b3172f7f78a4f4e = {
  id: "01a0c5f2-eb1e-7de3-b00f-27e607b903a3",
  type: "page-type/image",
  slug: "image-2b3172f7f78a4f4e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sleek black halter gown on a balcony at night, city skyline lights behind her, soft cinematic light, poised confident expression, 85mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/balcony",
    "setting-tag/night",
    "setting-tag/city",
    "setting-tag/outdoor",
  ],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/portrait",
  ],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/halter-top", "wardrobe-tag/sleeveless"],
  ethnicityTags: ["ethnicity-tag/mixed"],
} as const satisfies Image
