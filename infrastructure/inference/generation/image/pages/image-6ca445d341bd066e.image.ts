import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6ca445d341bd066e = {
  id: "01a0c5f3-361f-787c-98dd-67eea0bc57bb",
  type: "page-type/image",
  slug: "image-6ca445d341bd066e",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, head and shoulders turned 45 degrees from the camera, eyes looking into the lens with direct warm contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, charcoal racerback athletic tank with bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 1757291318,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
