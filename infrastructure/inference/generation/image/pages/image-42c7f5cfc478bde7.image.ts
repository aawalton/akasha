import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42c7f5cfc478bde7 = {
  id: "01a0c5f3-f000-7662-bffd-9506de2a1914",
  type: "page-type/image",
  slug: "image-42c7f5cfc478bde7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings shimmering violet and gold behind her, warm smile, head-and-shoulders portrait, standing among tall wooden library shelves, warm lamplight, holding a leather-bound book to her chest, golden dust motes in the air",
  seed: 4101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
