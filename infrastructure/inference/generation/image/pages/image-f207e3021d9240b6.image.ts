import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF207e3021d9240b6 = {
  id: "01a0c5f3-361f-71a1-8d1b-3e7b995cc402",
  type: "page-type/image",
  slug: "image-f207e3021d9240b6",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, head turned just slightly off-axis in a subtle quarter view, nearly facing the camera, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, blush-pink off-the-shoulder sweater leaving both shoulders bare, 85mm, shallow depth of field, photorealistic",
  seed: 102,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
