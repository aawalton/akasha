import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32e69761e1564a1e = {
  id: "019f57d3-50cd-7d44-98ac-4ea1a8c44605",
  type: "page-type/image",
  slug: "image-32e69761e1564a1e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "statuesque dark-skinned woman in a crimson mermaid-cut gown, standing on a grand balcony with wind in her hair, fierce confident stare, stormy evening sky, photorealistic photograph, natural skin texture, film grain",
  seed: 165591398,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: [
    "setting-tag/balcony",
    "setting-tag/outdoor",
    "setting-tag/ocean",
    "setting-tag/sunset",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/full-body"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/spaghetti-straps", "wardrobe-tag/jewelry"],
  ethnicityTags: ["ethnicity-tag/black"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
