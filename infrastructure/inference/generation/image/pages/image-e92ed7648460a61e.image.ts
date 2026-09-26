import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE92ed7648460a61e = {
  id: "01a0c5f3-3620-7bcb-a5a2-b7feba06e48d",
  type: "page-type/image",
  slug: "image-e92ed7648460a61e",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s sitting on smooth seaside rocks at dusk, looking toward the camera with direct warm eye contact, quiet warm smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural skin texture, blue eyes, fair skin, black bikini, pastel dusk sky and calm sea behind, 85mm, photorealistic",
  seed: 415,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
