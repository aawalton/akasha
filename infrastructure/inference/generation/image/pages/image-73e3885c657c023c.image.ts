import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image73e3885c657c023c = {
  id: "01a0c5f2-eb1e-73df-86c8-7421a0151326",
  type: "page-type/image",
  slug: "image-73e3885c657c023c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a flowing tulle skirt and fitted top on a rooftop at golden hour, soft breeze, dreamy warm light, joyful smile, 35mm, shallow depth of field, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/rooftop",
    "setting-tag/city",
    "setting-tag/outdoor",
    "setting-tag/sunset",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/smiling", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/sundress",
    "wardrobe-tag/sleeveless",
    "wardrobe-tag/sheer",
    "wardrobe-tag/spaghetti-straps",
  ],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
