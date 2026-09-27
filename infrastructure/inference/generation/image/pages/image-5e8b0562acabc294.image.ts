import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e8b0562acabc294 = {
  id: "01a0c5f2-eb25-7e2b-b817-f40dc2da3d03",
  type: "page-type/image",
  slug: "image-5e8b0562acabc294",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a softly lit bedroom, wearing a simple white cotton bra and matching panties, relaxed pose, morning window light, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/bedroom", "setting-tag/indoor"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/lingerie", "wardrobe-tag/bra", "wardrobe-tag/panties"],
  ethnicityTags: ["ethnicity-tag/mixed"],
} as const satisfies Image
