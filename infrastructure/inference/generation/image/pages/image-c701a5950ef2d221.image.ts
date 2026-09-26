import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC701a5950ef2d221 = {
  id: "01a0c5f3-9f6b-78cd-8ee0-3d7d509e53c4",
  type: "page-type/image",
  slug: "image-c701a5950ef2d221",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a Latina woman with warm olive skin and soft loose curls, mid-laugh genuine joy, warm brown eyes crinkled with the smile, golden sunlit afternoon light, soft feminine sundress, lively and present and personal, shallow depth of field",
  seed: 79542937,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
