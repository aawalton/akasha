import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image370b610bf3a871c7 = {
  id: "01a0c5f3-9f6d-79fb-8017-a8d228abf384",
  type: "page-type/image",
  slug: "image-370b610bf3a871c7",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a delicate adult fae woman with a slim petite youthful figure, small slender frame, large iridescent dragonfly wings, long loose golden hair, green eyes, soft serene expression, nude natural figure, hovering in a sunlit forest glade with glowing pollen, graceful relaxed pose, warm magical light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 861,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
