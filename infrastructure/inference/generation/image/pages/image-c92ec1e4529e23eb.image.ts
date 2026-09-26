import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC92ec1e4529e23eb = {
  id: "01a0c5f2-eb1f-7bfa-90d4-e10576ed922c",
  type: "page-type/image",
  slug: "image-c92ec1e4529e23eb",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a botanical garden date, casual floral blouse and jeans, surrounded by lush greenery and flowers, soft serene smile, gentle daylight, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
