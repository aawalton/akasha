import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ad530b206c2aa84 = {
  id: "01a0c5f3-8d0b-7d72-bd7c-f4dd241466e6",
  type: "page-type/image",
  slug: "image-8ad530b206c2aa84",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fine-art chiaroscuro nude study of a young woman with warm skin, dark hair, soft eyes meeting the camera with quiet steady tenderness and a soft almost-smile, lying close, dramatic single-source warm candlelight sculpting her bare form with deep velvety shadows, only the lit curve of shoulder hip and face emerging from darkness, painterly Rembrandt lighting, tasteful artistic nude, smooth skin, shallow depth of field, very close intimate framing, tender sensual reverent warm mood, natural soft skin texture, photographic, 85mm",
  seed: 729104,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
