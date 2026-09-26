import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image859c9f54794aecee = {
  id: "019f1839-4210-7048-a9b6-0bae22cb02aa",
  type: "page-type/image",
  slug: "image-859c9f54794aecee",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic, a young woman standing on the right third of a wide horizontal frame with calm open negative space on the left half, waist-up close framing so she fills the right of the frame, looking directly at the viewer with a warm soft alive expression, long wavy auburn-brown hair loose over bare shoulders, wearing a cream off-shoulder silk-and-lace princess chemise with pink ribbon lacing at the bodice and a brown leather work-belt at her hip holding a glowing warm-amber crystal tool, sunlit brass-and-vine solarpunk workshop-garden, a tall sunlit arched window draped with green vine filling the left side, warm golden-green dappled light, soft bokeh greenery, cinematic warm light, realistic skin, DSLR 85mm, sharp focus",
  seed: 5001,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
