import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8c611a8907a7753 = {
  id: "01a0c5f3-3620-76b9-82bc-e3a78480ca3a",
  type: "page-type/image",
  slug: "image-c8c611a8907a7753",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back on cream sheets, arms above her head with wrists loosely crossed, long blonde hair fanned out around her face, looking up into the camera with direct warm eye contact, soft playful smile, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural skin texture, blue eyes, fair skin, wearing a black lace lingerie set, warm low lamplight, 35mm, photorealistic",
  seed: 442,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
