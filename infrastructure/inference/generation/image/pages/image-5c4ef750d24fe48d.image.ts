import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c4ef750d24fe48d = {
  id: "01a0c5f3-361f-7a24-a952-096a58111c21",
  type: "page-type/image",
  slug: "image-5c4ef750d24fe48d",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting cross-legged on a couch next to the viewer, looking over at the camera with direct warm eye contact, relaxed soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, baggy heather-gray t-shirt and black yoga pants, cozy evening lamplight, 50mm, shallow depth of field, photorealistic",
  seed: 202,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
