import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA512de6ff81ce18a = {
  id: "01a0c5f3-7a9c-7489-9956-c206fa41ef09",
  type: "page-type/image",
  slug: "image-a512de6ff81ce18a",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only sheer black stockings on a Prague hotel bed, bare above, kneeling with knees apart, lamplight and castle out the window, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1439904061,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
