import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34364b1fdeef5279 = {
  id: "01a0c5f2-eb1e-74e6-96a7-7c2f3a27c4f3",
  type: "page-type/image",
  slug: "image-34364b1fdeef5279",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a long flowy maxi skirt and crop top walking a breezy beach, fabric drifting in the wind, golden-hour light, serene smile, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
