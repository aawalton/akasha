import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3da64770fc710830 = {
  id: "01a0c5f3-361f-7c04-8729-5ef130e09762",
  type: "page-type/image",
  slug: "image-3da64770fc710830",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s curled up on a couch beside the viewer holding a mug in both hands, looking over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, baggy cream t-shirt and black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 206,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
