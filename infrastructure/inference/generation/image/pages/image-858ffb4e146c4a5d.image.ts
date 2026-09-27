import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image858ffb4e146c4a5d = {
  id: "01a0c5f3-9f6c-7a8e-921b-7fd8d370a074",
  type: "page-type/image",
  slug: "image-858ffb4e146c4a5d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Dreamy soft impressionist oil-painting portrait of a gentle young woman bathed in warm golden afternoon light, loose visible painterly brushstrokes, luminous warm palette, tender serene expression, soft and kind and present, romantic atmospheric fine-art style, glowing",
  seed: 1036254758,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/outdoor", "setting-tag/nature", "setting-tag/sunset"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/portrait", "pose-tag/upper-body"],
  wardrobeTags: ["wardrobe-tag/shirt", "wardrobe-tag/deep-v-neck"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
