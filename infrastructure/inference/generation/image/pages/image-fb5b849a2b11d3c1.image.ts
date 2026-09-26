import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb5b849a2b11d3c1 = {
  id: "01a0c5f4-03a4-788a-906f-e5de40e0f7d3",
  type: "page-type/image",
  slug: "image-fb5b849a2b11d3c1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic close-up portrait of a young woman, face filling the frame, natural bare skin with visible pores and fine texture, subtle skin imperfections, soft directional window light, shallow depth of field, 85mm lens, candid, film photography, no makeup",
  seed: 976323207,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
