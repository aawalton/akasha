import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ad95ccd842839d0 = {
  id: "01a0c5f2-eb21-73bf-a6b8-f732ab671618",
  type: "page-type/image",
  slug: "image-1ad95ccd842839d0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman by an Amsterdam canal with bicycles and narrow houses, casual outfit and light jacket, soft daylight, cheerful relaxed smile, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
