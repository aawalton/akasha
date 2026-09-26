import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7465763d0ebbc10f = {
  id: "01a0c5f3-361f-7ad7-97ad-99d2543aedc8",
  type: "page-type/image",
  slug: "image-7465763d0ebbc10f",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s curled up on a couch beside the viewer holding a mug in both hands, looking over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, baggy washed-black t-shirt and black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 302,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
