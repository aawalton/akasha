import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC482ac7944d6fdb4 = {
  id: "01a0c5f3-f003-7697-b788-b0ed509f4253",
  type: "page-type/image",
  slug: "image-c482ac7944d6fdb4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties lying back on lush green grass with her eyes closed enjoying the sun, casual floral sundress, springtime park with blossoming trees, soft natural light, serene mood, 85mm candid portrait, visible skin texture",
  seed: 313241223,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/park",
    "setting-tag/outdoor",
    "setting-tag/field",
    "setting-tag/cherry-blossoms",
  ],
  poseTags: ["pose-tag/lying-down", "pose-tag/eyes-closed", "pose-tag/looking-up"],
  wardrobeTags: ["wardrobe-tag/sundress", "wardrobe-tag/spaghetti-straps"],
} as const satisfies Image
