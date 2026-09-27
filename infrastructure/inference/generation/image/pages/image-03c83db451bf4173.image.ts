import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image03c83db451bf4173 = {
  id: "01a0c5f3-b3cb-73ec-9a09-d1d4dc9796aa",
  type: "page-type/image",
  slug: "image-03c83db451bf4173",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with twin-tailed blonde hair and warm ruby eyes, serene peaceful look, wearing frilly maid outfit, at starry observatory deck, fresh spring colors, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/outdoor", "setting-tag/balcony"],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-at-viewer", "pose-tag/hands-clasped"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/suit"],
  fantasyTags: ["fantasy-tag/anime", "fantasy-tag/red-eyes"],
} as const satisfies Image
