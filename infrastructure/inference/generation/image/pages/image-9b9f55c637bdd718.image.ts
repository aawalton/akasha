import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b9f55c637bdd718 = {
  id: "01a0c5f3-3620-7101-a235-235450c9bfe9",
  type: "page-type/image",
  slug: "image-9b9f55c637bdd718",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties sitting on smooth seaside rocks at dusk just out of the water, dripping wet blonde hair, looking toward the camera with direct warm eye contact, quiet warm smile, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural wet skin texture, blue eyes, fair skin, wearing only a drenched white t-shirt turned transparent and clinging to her, nothing underneath, pastel dusk sky and calm sea behind, 85mm, photorealistic",
  seed: 436,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
