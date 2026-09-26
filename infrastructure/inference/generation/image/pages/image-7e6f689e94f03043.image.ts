import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e6f689e94f03043 = {
  id: "01a0c5f3-7a9c-727e-970d-715f8146cea9",
  type: "page-type/image",
  slug: "image-7e6f689e94f03043",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "top-down overhead shot of a young fictional Korean kpop idol woman sunbathing on a linen blanket laid on green grass, wearing a mint bikini, arms relaxed, dappled tree shade and patches of sunlight, natural daylight, flat lay photographic style, visible fabric weave and skin texture, photorealistic",
  seed: 1858426659,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
