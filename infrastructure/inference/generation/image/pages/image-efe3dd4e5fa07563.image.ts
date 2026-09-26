import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEfe3dd4e5fa07563 = {
  id: "01a0c5f3-9f6e-7410-a95a-47bd92da44d3",
  type: "page-type/image",
  slug: "image-efe3dd4e5fa07563",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body fantasy art of a mermaid resting on a sea rock at dusk, half out of the water, bare chested with no clothing on her torso, long red hair flowing forward over her chest, deep crimson and orange scaled tail draped over the rock, fair freckled skin, green eyes, wistful expression, soft golden dusk light and gentle waves, 35mm full length, photorealistic, artful",
  seed: 824,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
