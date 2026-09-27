import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image79a0c7dc406969ce = {
  id: "019f1839-05ec-7c5c-a523-1c915d8d8a7b",
  type: "page-type/image",
  slug: "image-79a0c7dc406969ce",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of two ethereal young women with pale luminous skin and silver-white hair, cheeks nearly touching in breathless closeness, soft otherworldly light with drifting glowing particles, dreamlike and magical, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80260011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/abstract-background", "setting-tag/studio"],
  poseTags: ["pose-tag/profile", "pose-tag/close-up", "pose-tag/front-view"],
  wardrobeTags: ["wardrobe-tag/top"],
  fantasyTags: ["fantasy-tag/silver-hair"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
