import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA67af9c76b6cb261 = {
  id: "01a0c5f3-361f-7d30-b0a0-b167a99badad",
  type: "page-type/image",
  slug: "image-a67af9c76b6cb261",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s leaning back relaxed against the couch cushions beside the viewer, an open book resting in her hands, head turned to look over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture with visible pores and fine lines, blue eyes, fair skin, oversized loose champagne silk t-shirt with a soft drape, black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 321,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
