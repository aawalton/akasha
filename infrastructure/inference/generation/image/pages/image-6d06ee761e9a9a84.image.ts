import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d06ee761e9a9a84 = {
  id: "01a0c5f3-361f-759b-b894-2043cb96ce8c",
  type: "page-type/image",
  slug: "image-6d06ee761e9a9a84",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, nearly frontal pose with shoulders square to the camera, head turned only ten degrees, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, soft floral summer sundress with thin straps and bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 1865747897,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
