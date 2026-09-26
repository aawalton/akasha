import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdcf15fb32a65c36 = {
  id: "01a0c5f3-3620-77cd-acbb-958e0ae3275b",
  type: "page-type/image",
  slug: "image-adcf15fb32a65c36",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties climbing out of a pool on the ladder, wet blonde hair clinging to her shoulders, looking up at the camera with direct warm eye contact, playful smile, naturally pretty girl-next-door face, soft unsculpted features, light freckles, minimal makeup, natural skin texture with droplets, blue eyes, fair skin, white bikini, bright midday sun and sparkling water, 50mm, photorealistic",
  seed: 422,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
