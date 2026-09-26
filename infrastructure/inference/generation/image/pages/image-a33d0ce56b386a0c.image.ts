import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA33d0ce56b386a0c = {
  id: "01a0c5f3-2541-7f3e-a59f-9ba01bab3b67",
  type: "page-type/image",
  slug: "image-a33d0ce56b386a0c",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cinematic photorealistic portrait of a slim Celtic goddess of summer standing on a green Irish hilltop at warm dusk, blazing red hair flowing in a soft breeze, bright green eyes, fair freckled skin, calm proud expression with direct eye contact, earthy green and gold draped dress, distant fields and a low golden sun, warm rim light, 85mm, photorealistic",
  seed: 703,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
