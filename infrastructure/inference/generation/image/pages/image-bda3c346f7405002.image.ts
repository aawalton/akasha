import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBda3c346f7405002 = {
  id: "01a0c5f2-eb21-737c-ae42-75896f533bc9",
  type: "page-type/image",
  slug: "image-bda3c346f7405002",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a bikini walking along a sunlit beach, looking back over her shoulder with a playful smile, ocean breeze in her hair, warm golden-hour light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
