import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFacd845195d22c3d = {
  id: "01a0c5f3-361f-72a6-a834-3cccf7023985",
  type: "page-type/image",
  slug: "image-facd845195d22c3d",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s leaning back relaxed against the couch cushions beside the viewer, an open book resting in her hands, head turned to look over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, cream off-the-shoulder sweater leaving both shoulders bare, black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 314,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
