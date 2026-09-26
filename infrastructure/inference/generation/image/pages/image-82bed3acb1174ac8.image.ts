import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image82bed3acb1174ac8 = {
  id: "019f5b51-febb-7afe-8b4e-93e64b375140",
  type: "page-type/image",
  slug: "image-82bed3acb1174ac8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a light slip dress with the white windmills of Mykonos behind her, hair lifted by the meltemi wind, whitewash and deep blue sky, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1398513976,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
