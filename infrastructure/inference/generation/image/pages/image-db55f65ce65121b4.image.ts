import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb55f65ce65121b4 = {
  id: "019f5bb3-66ba-7d1e-9fb4-cafcf63d0ed2",
  type: "page-type/image",
  slug: "image-db55f65ce65121b4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "couple having sex against a Parisian apartment wall, her legs wrapped around his hips as he holds her up, both nude, her face over his shoulder toward the lens, city lights, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 58037954,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
