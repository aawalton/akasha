import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f0f19b9731b9d38 = {
  id: "01a0c5f3-8d0f-70b1-ab9a-a4eaa2bef73c",
  type: "page-type/image",
  slug: "image-6f0f19b9731b9d38",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a lively young cat girl with a slim petite frame, a lovely human girls face with soft smooth human features, small human nose, full human lips, light freckles, amber slit-pupil eyes, brown tabby-striped cat ears on top of her head and a long striped tail, wavy brown hair, curious gentle smile, nude natural figure, sitting gracefully in a sunlit garden among tall flowers, warm natural light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 892,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
