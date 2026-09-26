import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9f203489ab89e433 = {
  id: "01a0c5f2-eb24-73ad-b46d-6ded8d19710f",
  type: "page-type/image",
  slug: "image-9f203489ab89e433",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman nude under a rainfall showerhead, face tilted up into the water, soft contented expression, warm steamy bathroom, soft diffused light, intimate framing, 50mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
