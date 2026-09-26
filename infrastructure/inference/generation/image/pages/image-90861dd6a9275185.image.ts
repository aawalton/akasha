import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image90861dd6a9275185 = {
  id: "019f28cf-323b-74dc-9ec1-b1159a3c0225",
  type: "page-type/image",
  slug: "image-90861dd6a9275185",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties leaning back against warm sandstone at golden hour, composed and still. Long black hair loose over one shoulder. Eyes open and blind: flat matte white irises, unlit, non-reflective, faint pupil shadow at center, ordinary wet human eyes otherwise — no glow whatsoever. Serious quiet face, ancient patience. Cream linen wrap, terracotta shawl at her elbows. Golden side light, dry grass bokeh, natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6410,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
