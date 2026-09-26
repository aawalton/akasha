import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8e849a9c47f18773 = {
  id: "019f1839-4e9b-726a-8e6d-5c2335a94878",
  type: "page-type/image",
  slug: "image-8e849a9c47f18773",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a serene young woman, her skin faintly luminous, glowing golden star-sparkles densely and widely scattered across her skin, her hair, and the air around her, deep galaxy-blue eyes flecked with points of light, dark wavy hair threaded with stars, gentle inner glow, deep indigo cosmic background, bare shoulders, no visible clothing, chest-up, 85mm DSLR portrait, cinematic soft rim light, realistic skin texture, sharp focus",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
