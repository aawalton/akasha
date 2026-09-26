import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d6120910b2e230f = {
  id: "01a0c5f2-eb24-7048-a3f1-b6573fd59b18",
  type: "page-type/image",
  slug: "image-6d6120910b2e230f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman wearing an oversized men's button-up shirt, standing in a sunlit kitchen holding a steaming coffee mug with both hands, bare legs, relaxed morning posture, glancing warmly toward the viewer, soft golden window light, 35mm, fine fabric weave, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
