import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9648d74df1da9635 = {
  id: "01a0c5f3-9f6a-7a59-80aa-b60b78b3cd03",
  type: "page-type/image",
  slug: "image-9648d74df1da9635",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "topless woman sunbathing on a striped lounger at a Saint-Tropez beach club, bottoms only, propped on her elbows, golden tan lines, glittering sea behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 882480236,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
