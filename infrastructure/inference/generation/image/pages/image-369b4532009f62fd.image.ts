import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image369b4532009f62fd = {
  id: "01a0c5f3-9f6e-777f-898c-7cb678a96f3b",
  type: "page-type/image",
  slug: "image-369b4532009f62fd",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with lavender hime cut and big violet eyes, curious head tilt, wearing idol stage costume with ribbons, at snowy shrine with lanterns, fresh spring colors, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
