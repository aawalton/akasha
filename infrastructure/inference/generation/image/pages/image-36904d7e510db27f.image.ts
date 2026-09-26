import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image36904d7e510db27f = {
  id: "01a0c5f3-361f-797c-97ee-5b960b9a8c35",
  type: "page-type/image",
  slug: "image-36904d7e510db27f",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s leaning back relaxed against the couch cushions beside the viewer, an open book resting in her hands, head turned to look over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft unsculpted features, light freckles, minimal makeup, natural skin texture, blue eyes, fair skin, oversized ivory washed-silk t-shirt draping loosely, black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 322,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
