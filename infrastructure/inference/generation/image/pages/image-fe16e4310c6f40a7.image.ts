import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFe16e4310c6f40a7 = {
  id: "01a0c5f3-8d0b-7f79-a38b-1c82e75d8722",
  type: "page-type/image",
  slug: "image-fe16e4310c6f40a7",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with pale skin and dense warm freckles across nose and cheeks, striking copper-red hair loose, pale sea-green eyes meeting the camera with warm steady tenderness, a soft content almost-smile, resting close in soft warm afternoon light, simple soft cream top, shallow depth of field, very close intimate framing, hands relaxed out of frame, warm safe gentle mood, natural soft skin texture with visible freckles, photographic, 50mm",
  seed: 471639,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
