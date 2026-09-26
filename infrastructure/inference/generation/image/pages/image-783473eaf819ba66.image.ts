import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image783473eaf819ba66 = {
  id: "01a0c5f3-361f-7207-9ad4-b2212e8e4fe2",
  type: "page-type/image",
  slug: "image-783473eaf819ba66",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile, slightly tousled blonde hair tucked behind one ear, youthful soft features with faint freckles, blue eyes, fair skin, soft blue chambray shirt, 85mm, shallow depth of field, photorealistic",
  seed: 1601754686,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
