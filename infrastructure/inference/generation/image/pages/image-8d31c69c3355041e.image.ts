import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8d31c69c3355041e = {
  id: "01a0c5f3-7a9c-7b06-a26a-88b968000e6e",
  type: "page-type/image",
  slug: "image-8d31c69c3355041e",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic full-body portrait of a literal angel: a young Caucasian woman with fair pale skin kneeling in prayer, both knees on the ground, hands clasped together at her chest, eyes gently lowered in quiet devotion. She wears a flowing garment woven entirely of soft white feathers, draped over her shoulders and down her body like a feathered cloak — NO wings, the feathers are the garment itself. No halo. Serene, reverent, peaceful expression. Soft radiant angelic lighting, a warm divine glow descending from above, gentle volumetric god-rays, ethereal sacred atmosphere, subtle bloom. Delicate detailed white feathers, natural skin texture, cinematic, soft dark background. Highly detailed, reverent, holy.",
  seed: 501268508,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
