import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb1b854cd739d439 = {
  id: "01a0c5f2-eb1f-7f8e-bf20-9f150e975842",
  type: "page-type/image",
  slug: "image-fb1b854cd739d439",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an ornate silk furisode kimono with long flowing sleeves and floral patterns, standing in a traditional Japanese garden, soft daylight, graceful serene expression, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/outdoor", "setting-tag/garden", "setting-tag/temple"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/smiling"],
} as const satisfies Image
