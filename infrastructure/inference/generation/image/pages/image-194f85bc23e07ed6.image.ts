import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image194f85bc23e07ed6 = {
  id: "01a0c5f3-8d0f-7f90-9d62-b562bc0f32d6",
  type: "page-type/image",
  slug: "image-194f85bc23e07ed6",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, standing and sitting upright in a steamy traditional public bathhouse, nude, in a warm stone hot-spring pool with the water at waist level so their torsos are above the waterline, leaning close and looking at one another in candid conversation, relaxed serene expressions, soft natural light, light rising steam in the background, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 909,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
