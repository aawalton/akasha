import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1bc7cae7a2f581bb = {
  id: "019f1839-096f-7641-bddb-31ecfe7052e3",
  type: "page-type/image",
  slug: "image-1bc7cae7a2f581bb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two ethereal otherworldly women lovers with pale luminous skin, tasteful nude, a breath apart in the hush before a kiss gazing at each other's lips, one platinum-blonde and one soft rose-gold, drifting glowing light particles, dreamlike and deeply sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80390011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
