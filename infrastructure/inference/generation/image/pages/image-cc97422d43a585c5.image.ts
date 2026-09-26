import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCc97422d43a585c5 = {
  id: "01a0c5f3-b3cb-7fde-aa9c-cd234a34b074",
  type: "page-type/image",
  slug: "image-cc97422d43a585c5",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body fantasy art of a mermaid gliding through a green kelp forest, bare chested with no clothing on her torso, long dark-green hair swirling around her and veiling her chest, mossy-green and bronze scaled tail, olive skin with subtle scale texture, hazel eyes, curious expression, dappled green underwater light through the kelp, 35mm full length, photorealistic, artful underwater photography",
  seed: 826,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
