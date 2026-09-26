import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78a2deb623ded891 = {
  id: "01a0c5f2-eb21-702d-ae32-86dc1d25bf05",
  type: "page-type/image",
  slug: "image-78a2deb623ded891",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sleek bikini lounging on a poolside chair, sun-kissed skin, relaxed warm smile toward the viewer, bright summer sunlight, water glistening, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
