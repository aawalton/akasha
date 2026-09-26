import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f76a1c5b30c7ba7 = {
  id: "019f1836-d755-76f2-8b5c-edf7dc28e35b",
  type: "page-type/image",
  slug: "image-7f76a1c5b30c7ba7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime cyber idol, futuristic holographic-trimmed outfit with glowing visor pushed up, neon concert stage, energetic pose, vibrant cyberpunk light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
