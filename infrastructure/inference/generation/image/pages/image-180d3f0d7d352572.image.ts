import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image180d3f0d7d352572 = {
  id: "01a0c5f3-3620-74f9-8162-eef75d2de441",
  type: "page-type/image",
  slug: "image-180d3f0d7d352572",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties standing waist-deep in the sea, both hands pushing wet blonde hair back from her face, elbows up, looking straight into the camera with direct warm eye contact, soft confident smile, naturally pretty face with soft features, light freckles, minimal makeup, real skin texture glistening with seawater, blue eyes, fair skin, wearing only a wet white t-shirt rendered see-through by the water, clinging, nothing underneath, late afternoon sun, 85mm, photorealistic",
  seed: 435,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
