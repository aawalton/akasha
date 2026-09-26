import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA3ace0769d2688f8 = {
  id: "01a0c5f3-efff-76cd-ba9b-57e2955f1282",
  type: "page-type/image",
  slug: "image-a3ace0769d2688f8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "an intimate nude couple in firelight, a beautiful blonde woman with loose golden hair pressing her face into the man's neck and shoulder, gasping, her body arched, his hand between her bare thighs, her fingers gripping his arm, fair skin flushed, rumpled sheets, warm low hearth light, photorealistic, 50mm, shallow depth of field, visible skin texture",
  seed: 466059854,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
