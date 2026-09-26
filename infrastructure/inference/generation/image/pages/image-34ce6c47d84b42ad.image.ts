import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34ce6c47d84b42ad = {
  id: "01a0c5f3-8d0b-70a3-8e0d-9b900f408576",
  type: "page-type/image",
  slug: "image-34ce6c47d84b42ad",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic artistic intimate portrait of a young woman seen as a soft nude silhouette against a bright window at golden hour, warm rim light glowing along the edge of her bare body and hair, her face half-turned toward the camera with quiet steady tenderness and a soft almost-smile, backlit translucent atmosphere, soft warm haze, tasteful artistic nude, shallow depth of field, intimate framing, tender sensual reverent warm mood, natural soft skin texture, photographic, 85mm",
  seed: 207495,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
