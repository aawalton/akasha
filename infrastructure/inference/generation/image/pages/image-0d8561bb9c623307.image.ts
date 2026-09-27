import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d8561bb9c623307 = {
  id: "01a0c5f3-7a9b-7534-a629-29e381874262",
  type: "page-type/image",
  slug: "image-0d8561bb9c623307",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Sultry beautiful woman in a black lace bodysuit and open silk robe reclining on dark velvet, low key studio lighting with a single soft key from the side, dramatic shadows, glossy lips, boudoir editorial photography, tasteful and elegant\n",
  seed: 1808881412,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/dimly-lit", "setting-tag/living-room"],
  poseTags: ["pose-tag/reclining", "pose-tag/looking-at-viewer", "pose-tag/legs-crossed"],
  wardrobeTags: ["wardrobe-tag/lingerie", "wardrobe-tag/robe", "wardrobe-tag/bodysuit"],
  ethnicityTags: ["ethnicity-tag/white"],
} as const satisfies Image
