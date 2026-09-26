import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image863b54c83dc9f538 = {
  id: "019f5bb0-8071-7fbb-8e16-32d73406c383",
  type: "page-type/image",
  slug: "image-863b54c83dc9f538",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a Riviera chaise with her hand working between her spread thighs, oiled skin, sea behind the balustrade, biting her lip, gaze on the viewer, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 633405574,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
