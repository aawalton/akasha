import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image838cf48788eda0d2 = {
  id: "019f57fe-fbef-72f4-9300-b24d9e91d71c",
  type: "page-type/image",
  slug: "image-838cf48788eda0d2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "blissed-out woman in a gold lamé halter jumpsuit striking a pointing disco pose, mirror-ball starbursts on a packed dance floor, photorealistic photograph, natural skin texture, film grain",
  seed: 1510045588,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/indoor", "setting-tag/party", "setting-tag/bar"],
  poseTags: ["pose-tag/reaching", "pose-tag/dancing", "pose-tag/standing", "pose-tag/smiling"],
} as const satisfies Image
