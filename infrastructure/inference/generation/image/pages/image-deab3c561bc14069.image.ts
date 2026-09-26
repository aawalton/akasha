import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDeab3c561bc14069 = {
  id: "019f5bb5-0cfc-7c0c-81c7-0822a08160e5",
  type: "page-type/image",
  slug: "image-deab3c561bc14069",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude couple making love on a Greek island terrace at dusk, the woman on top grinding, hands braced on his chest, whitewash and blue sea behind, ecstatic eye contact, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1822889180,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
