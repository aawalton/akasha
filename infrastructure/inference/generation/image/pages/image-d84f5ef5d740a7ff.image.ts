import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD84f5ef5d740a7ff = {
  id: "01a0c5f3-8d0f-71b9-984d-9605971adbaf",
  type: "page-type/image",
  slug: "image-d84f5ef5d740a7ff",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young adult women, fictional K-pop idols relaxing together after a performance, standing upright in a shallow steamy traditional public bathhouse pool, nude, the warm water low at hip level so their full torsos and hips are well above the waterline, leaning close and looking at one another in candid conversation, relaxed serene expressions, soft natural light, faint rising steam in the background, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, tasteful artistic composition, cinematic ambiance",
  seed: 414,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
