import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb06eef6187d713e = {
  id: "01a0c5f3-361f-785f-8ec7-21984b7e7d93",
  type: "page-type/image",
  slug: "image-ab06eef6187d713e",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting on a couch with both knees drawn up to her chest, arms wrapped around them, photographed from the other end of the same couch, head turned to look over at the viewer with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture with visible pores, blue eyes, fair skin, oversized champagne silk t-shirt draping loosely, black yoga pants, soft evening light, warm throw blanket on the couch, 50mm, shallow depth of field, photorealistic",
  seed: 331,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
