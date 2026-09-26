import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA958616eeda66807 = {
  id: "01a0c5f3-361f-7526-85c7-34e3d30f4fbf",
  type: "page-type/image",
  slug: "image-a958616eeda66807",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, head and shoulders turned 45 degrees from the camera, eyes looking into the lens with direct warm contact, calm soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, lavender strappy yoga top with bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 788902725,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
