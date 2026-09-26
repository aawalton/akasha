import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e1d0ab451c00cc9 = {
  id: "01a0c5f3-2542-7672-a22b-dc858a389ac7",
  type: "page-type/image",
  slug: "image-3e1d0ab451c00cc9",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s, face angled in three-quarter view, eyes looking directly into the camera, calm warm expression with a hint of a smile, blonde hair down, blue eyes, fair skin with visible texture, oatmeal knit sweater, soft window light from the side, quiet home interior in bokeh, 105mm, photorealistic",
  seed: 1605695469,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
