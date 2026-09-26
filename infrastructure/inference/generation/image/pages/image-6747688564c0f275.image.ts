import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6747688564c0f275 = {
  id: "01a0c5f2-eb1f-7fd8-aa49-551b8f951072",
  type: "page-type/image",
  slug: "image-6747688564c0f275",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a picnic date in the park, casual sundress, sitting on a blanket with a basket, laughing softly toward the viewer, dappled afternoon sunlight, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
