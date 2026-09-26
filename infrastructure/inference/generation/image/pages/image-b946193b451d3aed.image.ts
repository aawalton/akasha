import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB946193b451d3aed = {
  id: "01a0c5f3-b3cb-7b4c-8eac-8d40a0508e75",
  type: "page-type/image",
  slug: "image-b946193b451d3aed",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with braided auburn hair and gentle blue eyes, serene peaceful look, wearing oversized hoodie and headphones, at cozy ramen shop counter, moody twilight tones, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
