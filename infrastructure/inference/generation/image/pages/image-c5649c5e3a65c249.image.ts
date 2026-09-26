import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC5649c5e3a65c249 = {
  id: "01a0c5f3-9f6d-7abe-9e5e-f88c243ff023",
  type: "page-type/image",
  slug: "image-c5649c5e3a65c249",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of a young cherry-blossom dryad, fair skin with a faint pink petal flush, long flowing hair full of pink sakura blossoms and petals drifting loose, soft pink eyes, serene smile, standing under a blooming cherry tree, petals in the air, warm spring light, ethereal beauty, 85mm, shallow depth of field, photorealistic",
  seed: 802,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
