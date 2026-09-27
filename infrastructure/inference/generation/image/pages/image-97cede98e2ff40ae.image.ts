import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97cede98e2ff40ae = {
  id: "019f1836-dd3e-78bf-a19d-08a986b83f46",
  type: "page-type/image",
  slug: "image-97cede98e2ff40ae",
  grade: "A-",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at a Greek island harbor with white boats, casual sundress and sun hat, bright blue sea behind, warm Mediterranean light, content smile, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/dock",
    "setting-tag/outdoor",
    "setting-tag/daytime",
    "setting-tag/water",
  ],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/portrait",
  ],
  wardrobeTags: ["wardrobe-tag/sundress", "wardrobe-tag/hat", "wardrobe-tag/sleeveless"],
} as const satisfies Image
