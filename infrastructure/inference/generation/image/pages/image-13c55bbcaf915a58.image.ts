import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image13c55bbcaf915a58 = {
  id: "01a0c5f3-b3ca-76dd-bfeb-ed8d9856e68a",
  type: "page-type/image",
  slug: "image-13c55bbcaf915a58",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic scene of a young woman with a soft wondering smile curled in a cozy golden-lit magical bookshop, warm lamplight, floating dust motes drifting through sunbeams, shelves of softly glowing books, enchanting warm inviting atmosphere, she glances warmly and tenderly toward the viewer, cinematic, shallow depth of field",
  seed: 1605921017,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
