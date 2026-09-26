import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7af20126ff6ceaff = {
  id: "01a0c5f3-361f-7e73-ae61-9430b80048d2",
  type: "page-type/image",
  slug: "image-7af20126ff6ceaff",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting on a couch hugging one knee to her chest with the other leg tucked under her, photographed from the other end of the same couch, looking over at the viewer with direct warm eye contact, soft amused smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft unsculpted features, light freckles, minimal makeup, natural skin texture, blue eyes, fair skin, oversized ivory washed-silk t-shirt, black yoga pants, soft evening lamplight, 50mm, shallow depth of field, photorealistic",
  seed: 332,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
