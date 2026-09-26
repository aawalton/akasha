import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE048c0f9845b43f9 = {
  id: "01a0c5f3-361f-71c1-8038-1e8216449bfc",
  type: "page-type/image",
  slug: "image-e048c0f9845b43f9",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up photo of a woman in her early 30s on a couch beside the viewer, head turned over her shoulder to look at the camera, direct warm eye contact, soft intimate smile, long straight blonde hair with a side part falling across one shoulder, delicate features with high cheekbones, blue eyes, fair skin, oversized baggy t-shirt slipping slightly off one shoulder, golden hour light, 85mm, shallow depth of field, photorealistic",
  seed: 205,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
