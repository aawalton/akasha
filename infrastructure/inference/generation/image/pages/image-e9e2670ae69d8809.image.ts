import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE9e2670ae69d8809 = {
  id: "01a0c5f3-9f6e-7dba-b50b-faabef2c8c30",
  type: "page-type/image",
  slug: "image-e9e2670ae69d8809",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol figure, standing in a rainfall shower glancing back over her shoulder with a delighted smile, soaked, wet lingerie, water droplets on her skin, steam, warm light, spontaneous candid snapshot",
  seed: 1651717586,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/outdoor", "setting-tag/rain", "setting-tag/waterfall"],
  poseTags: ["pose-tag/looking-back", "pose-tag/profile", "pose-tag/standing"],
  wardrobeTags: ["wardrobe-tag/bikini"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
