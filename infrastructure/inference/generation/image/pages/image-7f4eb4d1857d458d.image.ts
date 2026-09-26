import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f4eb4d1857d458d = {
  id: "019f1839-4d6b-7717-ae1c-c5279fac313b",
  type: "page-type/image",
  slug: "image-7f4eb4d1857d458d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a serene young woman, her luminous skin shimmering all over with countless tiny glowing golden star-sparkles across her face, shoulders and chest, deep galaxy-blue eyes flecked with points of light, dark wavy hair densely filled throughout with glittering golden stars and sparkles, gentle inner glow, deep indigo cosmic background, bare shoulders, no visible clothing, chest-up, 85mm DSLR portrait, cinematic soft rim light, realistic skin texture, sharp focus",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
