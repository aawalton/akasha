import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3264691454caf7b3 = {
  id: "019f5ba9-34eb-71cf-9e22-56cc797023de",
  type: "page-type/image",
  slug: "image-3264691454caf7b3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman lying in the shallow surf of a Sardinian beach, waves washing over her bare body, wet sand, arched slightly, ecstatic expression at the lens, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1986333827,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
