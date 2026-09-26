import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34c4db9c3040ca29 = {
  id: "01a0c5f3-361f-79e4-9f0e-83591df4f69f",
  type: "page-type/image",
  slug: "image-34c4db9c3040ca29",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s leaning back relaxed against the couch cushions beside the viewer, an open book resting in her hands, head turned to look over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, soft oatmeal open cardigan over a thin camisole, black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 316,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
