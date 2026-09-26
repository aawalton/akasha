import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB0ecdc16e17ec003 = {
  id: "01a0c5f3-b3c9-726e-a8b9-d32712b204cb",
  type: "page-type/image",
  slug: "image-b0ecdc16e17ec003",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Wisconsin personified as a beautiful young woman in her early twenties — golden-blonde hair braided in a crown, cozy red-and-black buffalo plaid jacket, wood violets in hand, rolling dairy farmland with a red barn and holstein cows by a blue lake behind her, fresh clear morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1286754187,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
