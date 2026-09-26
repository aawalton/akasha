import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image198b9428b7c0e8b4 = {
  id: "019f1839-4d67-78ff-ab65-15e93eb6fd16",
  type: "page-type/image",
  slug: "image-198b9428b7c0e8b4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a serene young woman, her luminous skin shimmering all over with countless tiny glowing golden star-sparkles across her face, shoulders and chest, deep galaxy-blue eyes flecked with points of light, dark wavy hair threaded with tiny stars, gentle inner glow, deep indigo cosmic background, bare shoulders, no visible clothing, chest-up, 85mm DSLR portrait, cinematic soft rim light, realistic skin texture, sharp focus",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
