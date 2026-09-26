import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFe3ffa9f1b1b1369 = {
  id: "01a0c5f3-7a9c-74bd-a7b4-fe2f4554f203",
  type: "page-type/image",
  slug: "image-fe3ffa9f1b1b1369",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in only a black garter belt and stockings in a Parisian boudoir, bare breasts, kneeling on the bed with an inviting gaze, warm lamplight, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2047275595,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
