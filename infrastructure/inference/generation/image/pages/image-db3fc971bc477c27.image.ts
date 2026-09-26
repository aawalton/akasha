import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb3fc971bc477c27 = {
  id: "01a0c5f3-b3c9-76d8-87c5-09026c4354d1",
  type: "page-type/image",
  slug: "image-db3fc971bc477c27",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with fluffy white curls and big violet eyes, cheerful smile, wearing shrine maiden outfit, at snowy shrine with lanterns, soft pastel palette, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
