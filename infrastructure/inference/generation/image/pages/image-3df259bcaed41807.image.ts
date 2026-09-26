import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3df259bcaed41807 = {
  id: "01a0c5f3-3620-79b3-8413-eca4a8c5a87b",
  type: "page-type/image",
  slug: "image-3df259bcaed41807",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s at the beach at golden hour, looking into the camera with direct warm eye contact, relaxed natural pose, soft smile, long straight blonde hair with a side part lifted slightly by the breeze, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, sage-green bikini, warm low sun, soft ocean bokeh, 85mm, shallow depth of field, photorealistic",
  seed: 411,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
