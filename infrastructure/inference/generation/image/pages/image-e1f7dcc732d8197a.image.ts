import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE1f7dcc732d8197a = {
  id: "019f5868-d147-7b93-af23-260236b47167",
  type: "page-type/image",
  slug: "image-e1f7dcc732d8197a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in briefs brushing her long hair before a mirror, bare back reflected, soft bedroom light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1463002942,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/bedroom", "setting-tag/mirror"],
  poseTags: ["pose-tag/standing", "pose-tag/back-view", "pose-tag/looking-in-mirror"],
  wardrobeTags: ["wardrobe-tag/panties", "wardrobe-tag/topless", "wardrobe-tag/nude"],
} as const satisfies Image
