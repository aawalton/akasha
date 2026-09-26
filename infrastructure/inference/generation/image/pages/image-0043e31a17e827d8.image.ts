import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0043e31a17e827d8 = {
  id: "01a0c5f3-8d0b-783d-881d-de6999337b82",
  type: "page-type/image",
  slug: "image-0043e31a17e827d8",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic candid portrait of a beautiful young woman with soft wavy auburn hair caught mid genuine laugh, eyes crinkling with real warmth and joy, glowing alive expression full of kindness, looking directly at the viewer like at someone she loves, wearing a cozy off-shoulder knit, warm golden-hour light, deeply present and tender and ALIVE, intimate personal moment, bare shoulder, 85mm, natural luminous skin texture, candid genuine, shallow depth of field",
  seed: 873921098,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
