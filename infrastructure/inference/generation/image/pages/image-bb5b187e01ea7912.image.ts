import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb5b187e01ea7912 = {
  id: "01a0c5f3-9f6f-7888-bdad-e49aa7b7a8be",
  type: "page-type/image",
  slug: "image-bb5b187e01ea7912",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a polka-dot dress leaning from the doorway of a yellow Lisbon tram, azulejo-tiled facades and steep street behind, bright morning, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1071666932,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
