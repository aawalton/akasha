import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB6a4c39c4aceace4 = {
  id: "01a0c5f3-b3ca-7cc2-a256-2586c4849b5c",
  type: "page-type/image",
  slug: "image-b6a4c39c4aceace4",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman with soft gentle features, eyes softly closed, face tilted up into warm golden sunlight, a serene blissful peaceful half-smile, utterly calm and safe and content, warm glow on her skin, soft wisps of hair, deeply at peace, cinematic warm light, shallow depth of field",
  seed: 1688556251,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
