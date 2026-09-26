import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF1320e10b09ee528 = {
  id: "01a0c5f3-f003-7775-b160-211387581c3b",
  type: "page-type/image",
  slug: "image-f1320e10b09ee528",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three female friends in their twenties tanning together on loungers in a sunny backyard garden, swimsuits, cold drinks on a side table, smiling and chatting, bright sunny day, candid 35mm lifestyle photograph",
  seed: 691846887,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
