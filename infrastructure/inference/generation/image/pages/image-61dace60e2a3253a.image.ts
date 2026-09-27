import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61dace60e2a3253a = {
  id: "01a0c5f2-eb1d-77c6-9f3b-20fc32b1eaf2",
  type: "page-type/image",
  slug: "image-61dace60e2a3253a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an ivory lace evening gown at a garden evening reception, string lights bokeh, soft warm light, gentle radiant smile, 50mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/outdoor",
    "setting-tag/party",
    "setting-tag/garden",
    "setting-tag/night",
  ],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/smiling",
    "pose-tag/looking-at-viewer",
    "pose-tag/portrait",
  ],
  wardrobeTags: [
    "wardrobe-tag/lace",
    "wardrobe-tag/dress",
    "wardrobe-tag/sleeveless",
    "wardrobe-tag/gown",
  ],
  ethnicityTags: ["ethnicity-tag/mixed"],
} as const satisfies Image
