import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image365dde4a404447e4 = {
  id: "019f1839-132c-71ec-aead-9d4fda0430b3",
  type: "page-type/image",
  slug: "image-365dde4a404447e4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a luminous translucent holographic projection of an idealized beautiful woman, her form made of glowing light and sacred-geometry line, semi-transparent so you can see through her, her body and face coalescing out of interlocking triangles and golden-ratio spirals, volumetric light, edges dissolving into drifting particles of light, NOT solid flesh, a projection flickering at the threshold of reality, perfectly bilaterally symmetric idealized beauty with features that feel unresolved and shifting, ethereal untouchable, modern minimalist, deep dark void background, no clothing ornament, no jewelry, indigo and violet light, cosmic cool glow",
  seed: 1406928035,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
