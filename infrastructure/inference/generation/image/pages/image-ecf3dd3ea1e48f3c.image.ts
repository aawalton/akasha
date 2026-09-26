import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEcf3dd3ea1e48f3c = {
  id: "01a0c5f3-f002-715e-a02b-e0e9af919722",
  type: "page-type/image",
  slug: "image-ecf3dd3ea1e48f3c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman lying on a bed, her fingers massaging inside her vagina, legs apart, full body in frame, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 1489320007,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
