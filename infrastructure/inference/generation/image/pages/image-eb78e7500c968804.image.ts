import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEb78e7500c968804 = {
  id: "01a0c5f2-f92d-7686-a181-2a3efd54ad31",
  type: "page-type/image",
  slug: "image-eb78e7500c968804",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, on a rocky canyon overlook at sunrise, athletic activewear, bright joyful expression, open sky behind her, soft natural light, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 695817402,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: [
    "setting-tag/outdoor",
    "setting-tag/canyon",
    "setting-tag/nature",
    "setting-tag/daytime",
  ],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/portrait",
  ],
  wardrobeTags: ["wardrobe-tag/tank-top", "wardrobe-tag/top"],
} as const satisfies Image
