import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d172c0b5e6a1941 = {
  id: "01a0c5f3-9f6d-7298-a833-e89f9ae6f153",
  type: "page-type/image",
  slug: "image-3d172c0b5e6a1941",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A woman standing at the edge of a bright summer sea at the shoreline, incoming tide washing over wet sand, warm low sunlight on the water, silver and blue sea against a warm sky, long auburn hair moving in the sea wind, open horizon, contemplative, painterly photographic, sea-silver and warm gold palette, cinematic coastal light",
  seed: 695864640,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
