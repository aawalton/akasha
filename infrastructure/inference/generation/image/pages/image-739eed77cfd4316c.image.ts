import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image739eed77cfd4316c = {
  id: "01a0c5f3-9f6d-705f-985b-06fb88731407",
  type: "page-type/image",
  slug: "image-739eed77cfd4316c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman resting her head against your shoulder and looking up at you, warm eyes meeting yours directly with soft contentment and trust, soft warm light, slightly messy hair, natural real skin texture with imperfections, a deeply close cozy contented moment, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 905173,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
