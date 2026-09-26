import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d138818286e9a6b = {
  id: "01a0c5f3-3620-74b4-a96b-42c54ceee805",
  type: "page-type/image",
  slug: "image-1d138818286e9a6b",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back on white linen sheets, arms raised above her head, long blonde hair spread across the pillow, looking up into the camera with direct warm eye contact, quiet warm smile, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural skin texture, blue eyes, fair skin, wearing a white lace lingerie set, soft morning window light, 35mm, photorealistic",
  seed: 441,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
