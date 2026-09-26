import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4401d77bbbddd2bf = {
  id: "01a0c5f3-8d0b-798d-91a9-71d920569835",
  type: "page-type/image",
  slug: "image-4401d77bbbddd2bf",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm fair skin, honey-blonde hair loose and soft, gentle hazel eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, kneeling close on soft bedding in warm low bedroom light, wearing delicate soft cream lace lingerie, bare shoulders arms and midriff, smooth skin in warm glow, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 673915,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
