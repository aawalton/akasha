import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image747ce6a7d3c6d359 = {
  id: "01a0c5f3-3620-7047-b435-2ebfde773317",
  type: "page-type/image",
  slug: "image-747ce6a7d3c6d359",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back, arms above her head, long blonde hair spread over the pillows, looking up into the camera with direct warm eye contact, soft intimate smile, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural skin texture, blue eyes, fair skin, wearing a deep navy lingerie set, warm candlelight glow from bedside, gentle shadows, 35mm, photorealistic",
  seed: 446,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
