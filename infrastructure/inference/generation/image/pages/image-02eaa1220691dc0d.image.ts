import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image02eaa1220691dc0d = {
  id: "01a0c5f4-03a4-7a51-b441-cdcbad53f62f",
  type: "page-type/image",
  slug: "image-02eaa1220691dc0d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a fashion model in her late twenties standing under a gentle waterfall, modest swimsuit, water cascading down, eyes closed serene expression, lush green backdrop, editorial portrait 85mm, soft natural light",
  seed: 1964338700,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: [
    "setting-tag/waterfall",
    "setting-tag/outdoor",
    "setting-tag/nature",
    "setting-tag/pool",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/looking-up", "pose-tag/eyes-closed"],
  wardrobeTags: ["wardrobe-tag/wet", "wardrobe-tag/swimsuit", "wardrobe-tag/spaghetti-straps"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
