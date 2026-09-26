import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD83f31b470ce3c5e = {
  id: "01a0c5f3-b3ca-76e3-b77f-52b54b663ba6",
  type: "page-type/image",
  slug: "image-d83f31b470ce3c5e",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with rich dark brown skin, soft natural curls framing her face, warm dark eyes meeting the camera with gentle tenderness, a soft unguarded almost-smile, resting very close to the viewer in warm golden lamplight, simple soft terracotta top slipping off one shoulder, shallow depth of field, very close intimate framing, hands relaxed out of frame, safe warm tender mood, natural soft skin texture, photographic, 50mm",
  seed: 829356,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
