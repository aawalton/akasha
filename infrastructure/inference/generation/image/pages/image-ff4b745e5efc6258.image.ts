import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf4b745e5efc6258 = {
  id: "01a0c5f3-9f6c-70e6-984a-2870bd2b98ad",
  type: "page-type/image",
  slug: "image-ff4b745e5efc6258",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman lit by warm golden light, her face open with genuine awe and wonder, eyes wide and softly lit, lips parted in a quiet gasp of delight, gazing up at something luminous off-frame, warm bokeh of golden floating lights around her, soft gentle kind features, deeply moved and present and safe, cinematic warm atmosphere, shallow depth of field",
  seed: 73692852,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
