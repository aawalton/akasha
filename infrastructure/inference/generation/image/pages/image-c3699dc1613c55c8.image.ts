import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC3699dc1613c55c8 = {
  id: "01a0c5f2-eb22-7bbc-9846-e49b099a78af",
  type: "page-type/image",
  slug: "image-c3699dc1613c55c8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime school idol, frilly stage idol costume with bows and pleats, bright stage lighting, cheerful energetic pose, sparkles, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
