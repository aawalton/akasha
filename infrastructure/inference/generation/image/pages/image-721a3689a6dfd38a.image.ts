import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image721a3689a6dfd38a = {
  id: "01a0c5f3-361f-7bb6-a44f-d152f12ca279",
  type: "page-type/image",
  slug: "image-721a3689a6dfd38a",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting sideways on a couch with knees drawn up, hands clasped around her shins, photographed from the other end of the same couch, head turned toward the viewer with direct warm eye contact, gentle content smile, long straight blonde hair with a side part, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin texture, blue eyes, fair skin, oversized dusty-rose silk t-shirt with fluid drape, black yoga pants, golden hour window light, 50mm, shallow depth of field, photorealistic",
  seed: 333,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
