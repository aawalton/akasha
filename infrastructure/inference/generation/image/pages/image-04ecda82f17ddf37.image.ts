import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image04ecda82f17ddf37 = {
  id: "01a0c5f3-2542-72a7-992b-356070e3cd04",
  type: "page-type/image",
  slug: "image-04ecda82f17ddf37",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, cream cable-knit sweater, 85mm, shallow depth of field, photorealistic",
  seed: 1278435245,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
