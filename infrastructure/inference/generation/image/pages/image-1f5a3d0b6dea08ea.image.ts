import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1f5a3d0b6dea08ea = {
  id: "01a0c5f3-8d0b-7043-8fc0-6d2e6f799a50",
  type: "page-type/image",
  slug: "image-1f5a3d0b6dea08ea",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm light-olive skin, dark hair loose and soft, gentle brown eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, leaning very close in warm candlelight, wearing a soft silk robe slipping open off both shoulders revealing bare shoulders collarbone and the soft curve of her chest suggested, smooth skin in golden glow, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 552840,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
