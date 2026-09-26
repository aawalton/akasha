import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5a92dd22f4956b3c = {
  id: "01a0c5f3-3620-71a7-9a3d-b2a1d5aa369f",
  type: "page-type/image",
  slug: "image-5a92dd22f4956b3c",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back, arms raised above her head, long blonde hair fanned across white linen, looking up into the camera with direct warm eye contact, soft amused smile, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real skin texture, blue eyes, fair skin, wearing a sage-green lingerie set, soft evening light with warm shadows, 35mm, photorealistic",
  seed: 445,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
