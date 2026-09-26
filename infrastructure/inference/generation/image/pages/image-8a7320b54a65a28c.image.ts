import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a7320b54a65a28c = {
  id: "01a0c5f3-8d0f-70da-9300-9eb08725eb9b",
  type: "page-type/image",
  slug: "image-8a7320b54a65a28c",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Intimate first-person POV: a beautiful young woman has just arrived close to you in a warm private candlelit room, the very instant of reaching you — soft delighted recognition lighting up her face because it is YOU, body turned fully toward the viewer, leaning gently in to close the last of the distance, warm open eyes meeting yours, natural genuine smile. Auburn waves, fair freckled skin, soft cream off-shoulder knit, golden lamplight, shallow depth of field, photographic, naturalistic skin with real imperfection, cozy and personal. Only her in frame, no other person, nothing of the viewer visible.",
  seed: 1580579177,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
