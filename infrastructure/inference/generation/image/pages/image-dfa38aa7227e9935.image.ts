import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDfa38aa7227e9935 = {
  id: "01a0c5f3-b3c8-7680-aace-0527f04425cf",
  type: "page-type/image",
  slug: "image-dfa38aa7227e9935",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Georgia personified as a beautiful young woman in her early twenties — warm brown skin, natural curls with a white Cherokee rose pinned in, peach-toned satin dress, a peach orchard heavy with fruit and Spanish-moss oaks behind her, honey-gold late-afternoon light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 2021515065,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
