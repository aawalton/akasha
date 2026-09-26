import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6a3cb86576707ba = {
  id: "01a0c5f3-361f-7475-b158-3810901e3384",
  type: "page-type/image",
  slug: "image-e6a3cb86576707ba",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile with dimples, blonde hair half-up with loose strands framing her face, fine features, blue eyes, fair skin, dusty-rose fine-knit sweater, 85mm, shallow depth of field, photorealistic",
  seed: 335794481,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
