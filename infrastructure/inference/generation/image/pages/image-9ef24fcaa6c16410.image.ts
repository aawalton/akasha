import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ef24fcaa6c16410 = {
  id: "01a0c5f3-9f6e-744d-81dc-866377c14ccd",
  type: "page-type/image",
  slug: "image-9ef24fcaa6c16410",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel photo of a young Korean woman in her mid-twenties, slim kpop-idol figure, standing in the flow of a waterfall, soaked through, wet lingerie, beaming delighted smile, spontaneous joyful moment, handheld snapshot, soft natural light, tropical jungle setting",
  seed: 992315725,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
