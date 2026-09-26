import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF41d1ff609eb4492 = {
  id: "01a0c5f3-3620-77f1-a9ef-4674bd0f7934",
  type: "page-type/image",
  slug: "image-f41d1ff609eb4492",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s relaxing on a poolside lounge chair, head turned to look at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, natural authentic beauty, soft features, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, sky-blue bikini, late afternoon sun with palm shadows, 50mm, shallow depth of field, photorealistic",
  seed: 416,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
