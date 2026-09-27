import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD4c75575d0c8fbbf = {
  id: "019f1839-0267-7c4d-8547-5627da33fbde",
  type: "page-type/image",
  slug: "image-d4c75575d0c8fbbf",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two young women who look like sisters, similar soft delicate features, one with honey-blonde hair and one with light brown hair, close together cheek near cheek, tender affectionate mood, soft diffused window light, warm neutral interior, gentle natural smiles, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80030011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-3",
  settingTags: ["setting-tag/indoor", "setting-tag/studio"],
  poseTags: ["pose-tag/close-up", "pose-tag/looking-at-viewer", "pose-tag/embracing"],
  wardrobeTags: ["wardrobe-tag/top", "wardrobe-tag/casual-wear"],
} as const satisfies Image
