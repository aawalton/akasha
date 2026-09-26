import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA6a716661c50dcb5 = {
  id: "019f1839-4e94-7f42-a4e9-c88e9af1eb8b",
  type: "page-type/image",
  slug: "image-a6a716661c50dcb5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a serene young woman, her skin faintly luminous as if dusted with starlight, a scattering of softly glowing golden star-freckles across her cheeks and shoulders, deep galaxy-blue eyes flecked with points of light, dark wavy hair threaded with tiny stars, gentle inner glow, deep indigo cosmic background, chest-up, 85mm DSLR portrait, cinematic soft rim light, realistic skin texture, sharp focus",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
