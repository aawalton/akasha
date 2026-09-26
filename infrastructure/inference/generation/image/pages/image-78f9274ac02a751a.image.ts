import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78f9274ac02a751a = {
  id: "01a0c5f3-3620-7947-aeae-7c9fe9d033af",
  type: "page-type/image",
  slug: "image-78f9274ac02a751a",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting on a couch hugging one knee, relaxed against the backrest, photographed from the other end of the same couch, looking over at the viewer with direct warm eye contact, quiet warm smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft unsculpted features, minimal makeup, natural skin texture with fine lines, blue eyes, fair skin, oversized soft-gray cashmere t-shirt draping loosely, black yoga pants, cozy evening lamplight, 50mm, shallow depth of field, photorealistic",
  seed: 335,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
