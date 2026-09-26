import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image547e67a49402a1ca = {
  id: "019f1839-4d0d-7b51-8654-2d01a7654aa4",
  type: "page-type/image",
  slug: "image-547e67a49402a1ca",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a primordial goddess of stardust, a young woman of cohered cosmic dust, a serene ancient gaze on a newly-made face, faint glowing constellations beneath luminous skin, draped in soft glowing cosmic light, deep space background scattered with distant stars, chest-up, 85mm portrait, cinematic rim light, realistic skin, sharp focus",
  seed: 303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
