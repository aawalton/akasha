import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF9885436a4389fe4 = {
  id: "01a0c5f3-b3c8-7894-b89b-34ed96303811",
  type: "page-type/image",
  slug: "image-f9885436a4389fe4",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a giant folded paper crane across her torso, minimalist white studio, serene gaze, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2113102709,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
