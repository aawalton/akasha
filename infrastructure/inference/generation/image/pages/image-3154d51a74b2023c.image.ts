import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3154d51a74b2023c = {
  id: "01a0c5f3-b3cb-764f-bc9e-9d4c04d304f6",
  type: "page-type/image",
  slug: "image-3154d51a74b2023c",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of a young oak dryad, warm brown skin with delicate bark-textured patterns along her arms, hair of green oak leaves and small acorns, amber eyes, gentle curious expression looking at the viewer, dappled spring forest sunlight, tiny green shoots in her hair, soft natural beauty, 85mm, shallow depth of field, photorealistic",
  seed: 801,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
