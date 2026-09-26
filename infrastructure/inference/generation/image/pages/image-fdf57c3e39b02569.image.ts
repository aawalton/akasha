import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFdf57c3e39b02569 = {
  id: "01a0c5f3-9f6e-785c-8131-7762512e992c",
  type: "page-type/image",
  slug: "image-fdf57c3e39b02569",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, joyfully twirling in the rain, delighted laughing smile, drenched, wet lingerie, water spraying off her hair, soft overcast light, tropical garden, dynamic spontaneous candid snapshot",
  seed: 1427938002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
