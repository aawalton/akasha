import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF214c8ff385939df = {
  id: "01a0c5f3-9f6b-7a18-acfc-6b14b6866de1",
  type: "page-type/image",
  slug: "image-f214c8ff385939df",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic black and white fine-art nude study of a young woman with smooth skin, dark hair, soft eyes meeting the camera with quiet steady tenderness and a soft almost-smile, reclining close, classic monochrome film photography with rich tonal gradation and soft grain, soft directional light sculpting her bare form, tasteful artistic nude, deep blacks and luminous highlights, shallow depth of field, very close intimate framing, tender sensual reverent mood, natural soft skin texture, photographic, 85mm, black and white",
  seed: 845192,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
