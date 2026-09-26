import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d5ee6ce3fa14180 = {
  id: "01a0c5f3-2541-75a7-b91e-074e58d59fff",
  type: "page-type/image",
  slug: "image-3d5ee6ce3fa14180",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cinematic photorealistic portrait of an Irish sun goddess, slim Celtic figure, blazing red hair haloed and glowing with golden sunlight, luminous green eyes, fair freckled skin, serene powerful expression with direct eye contact, flowing white and gold gown with subtle solar embroidery, a faint warm radiance around her, summer sky behind, dramatic golden light, 85mm, photorealistic",
  seed: 706,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
