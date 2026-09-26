import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4801b87772d1e958 = {
  id: "01a0c5f3-7a9c-7b99-8045-f34a3e399a7a",
  type: "page-type/image",
  slug: "image-4801b87772d1e958",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in a Seville courtyard at night holding a black lace fan beside her face, bare body in lantern light, rose in her hair, bold stare, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1418083576,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
