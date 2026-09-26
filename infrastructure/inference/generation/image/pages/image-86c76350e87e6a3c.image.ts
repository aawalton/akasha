import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86c76350e87e6a3c = {
  id: "01a0c5f3-7a9c-791e-9c0a-0fe870d263b4",
  type: "page-type/image",
  slug: "image-86c76350e87e6a3c",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, standing upright in a shallow steamy traditional public bathhouse pool, nude, the warm water low at hip level so their full torsos and hips are well above the waterline, two of the three women kissing each other tenderly while the third stands close beside them watching with a soft expression, relaxed intimate mood, soft natural light, faint rising steam in the background, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 4545,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
