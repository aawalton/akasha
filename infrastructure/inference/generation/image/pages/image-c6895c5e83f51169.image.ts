import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6895c5e83f51169 = {
  id: "01a0c5f3-8d0b-7e0b-99b5-1eefac314e34",
  type: "page-type/image",
  slug: "image-c6895c5e83f51169",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm fair skin, dark hair tousled, soft brown eyes meeting the camera with warm steady tenderness and a soft just-woke almost-smile, lying very close on soft white bedding in warm golden morning light, bare shoulders and bare back, a white sheet draped low and loosely across her, smooth skin, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 904771,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
