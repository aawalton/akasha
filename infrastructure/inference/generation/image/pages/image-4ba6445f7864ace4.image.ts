import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4ba6445f7864ace4 = {
  id: "01a0c5f3-9f6f-7756-8a32-ca17c1ca3f78",
  type: "page-type/image",
  slug: "image-4ba6445f7864ace4",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties practicing a warrior pose on a yoga mat on a grassy lawn at sunrise, athletic yoga wear, serene expression, warm golden light, photoreal 35mm lifestyle photograph",
  seed: 1623618871,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
