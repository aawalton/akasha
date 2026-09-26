import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b9697affd0c304d = {
  id: "01a0c5f3-2542-7234-a20e-bd527502e184",
  type: "page-type/image",
  slug: "image-4b9697affd0c304d",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s, head and shoulders in three-quarter view, eyes turned to the camera with direct contact, gentle genuine smile, blonde hair loose catching golden-hour backlight, blue eyes, fair skin with light freckles, soft white linen shirt, warm bokeh background, 85mm, photorealistic",
  seed: 656540630,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
