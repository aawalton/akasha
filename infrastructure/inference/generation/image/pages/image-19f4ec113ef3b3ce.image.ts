import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image19f4ec113ef3b3ce = {
  id: "01a0c5f3-361f-7816-b9b1-5db2b0c69d39",
  type: "page-type/image",
  slug: "image-19f4ec113ef3b3ce",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, head and shoulders turned 45 degrees from the camera, eyes looking back into the lens with direct warm contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, soft floral summer sundress with thin straps and bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 2007622887,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
