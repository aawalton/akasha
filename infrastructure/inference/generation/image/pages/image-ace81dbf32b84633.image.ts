import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAce81dbf32b84633 = {
  id: "019f5b80-a399-775d-a3b0-9ab35388f066",
  type: "page-type/image",
  slug: "image-ace81dbf32b84633",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman lying on a yacht foredeck holding her untied bikini top loosely against her chest, teak deck and open Mediterranean, sun-drenched skin, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 614785014,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: [
    "setting-tag/boat",
    "setting-tag/balcony",
    "setting-tag/outdoor",
    "setting-tag/daytime",
  ],
  poseTags: ["pose-tag/reclining", "pose-tag/lying-down", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/bikini", "wardrobe-tag/nude"],
} as const satisfies Image
