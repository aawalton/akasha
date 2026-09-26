import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC20e6449b4ba45c4 = {
  id: "01a0c5f3-8d0e-72b3-8da1-a9d698ecdd39",
  type: "page-type/image",
  slug: "image-c20e6449b4ba45c4",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm fair skin, honey-blonde hair loose and soft, gentle hazel eyes meeting the camera with quiet steady tenderness, soft unguarded almost-smile, nestled very close under a soft knit blanket by warm firelight, cozy amber glow, simple soft cream top, shallow depth of field, very close intimate framing, hands relaxed out of frame, safe warm tender mood, natural soft skin texture, photographic, 50mm",
  seed: 778341,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
