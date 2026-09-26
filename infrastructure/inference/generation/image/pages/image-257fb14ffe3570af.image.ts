import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image257fb14ffe3570af = {
  id: "019f1839-4d03-7437-871c-c9a39a5ee1d9",
  type: "page-type/image",
  slug: "image-257fb14ffe3570af",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a serene young woman, her skin faintly luminous as if dusted with starlight, a scattering of softly glowing golden star-freckles across her cheeks and shoulders, deep galaxy-blue eyes flecked with points of light, dark wavy hair densely filled throughout with glittering golden stars and sparkles, gentle inner glow, deep indigo cosmic background, bare shoulders, no visible clothing, chest-up, 85mm DSLR portrait, cinematic soft rim light, realistic skin texture, sharp focus",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
