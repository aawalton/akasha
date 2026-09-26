import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image590d6714f0c2752b = {
  id: "019f588b-ad5a-757a-926f-9f24c043682a",
  type: "page-type/image",
  slug: "image-590d6714f0c2752b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a tall stack of old hardcover books against her chest, librarian smirk, warm study light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 833553562,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
