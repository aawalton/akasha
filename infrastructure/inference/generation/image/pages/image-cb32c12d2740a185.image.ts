import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb32c12d2740a185 = {
  id: "01a0c5f3-9f6b-7c93-b7cd-092ea9bb89b0",
  type: "page-type/image",
  slug: "image-cb32c12d2740a185",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman letting a silk robe fall open from her shoulders, caught mid-motion, warm boudoir light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 547985837,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/indoor", "setting-tag/bedroom", "setting-tag/studio"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-away", "pose-tag/hand-on-face"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/robe", "wardrobe-tag/nude"],
} as const satisfies Image
