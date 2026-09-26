import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA167981e84263314 = {
  id: "019f57ed-c0ba-710b-b692-00720846a113",
  type: "page-type/image",
  slug: "image-a167981e84263314",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "laser-focused sprinter in track shorts and crop top crouched in starting blocks, stadium floodlights at dusk, photorealistic photograph, natural skin texture, film grain",
  seed: 957286159,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
