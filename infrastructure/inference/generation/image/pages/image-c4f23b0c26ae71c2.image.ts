import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC4f23b0c26ae71c2 = {
  id: "01a0c5f3-b3c9-73bd-a413-80fa34e74227",
  type: "page-type/image",
  slug: "image-c4f23b0c26ae71c2",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Pennsylvania personified as a beautiful young woman in her early twenties — dark hair in a loose braid, mountain laurel blossoms in her hair, simple homespun dress with a wool shawl, rolling Amish farmland with a stone barn and covered bridge behind her, gentle pastoral evening light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1639422644,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
