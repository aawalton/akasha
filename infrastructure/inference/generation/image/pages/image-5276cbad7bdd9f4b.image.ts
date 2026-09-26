import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5276cbad7bdd9f4b = {
  id: "01a0c5f3-2542-7787-b02b-c28329ab01be",
  type: "page-type/image",
  slug: "image-5276cbad7bdd9f4b",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s, head and shoulders in three-quarter view, eyes turned to the lens with steady warm contact, open friendly expression, blonde hair down moving slightly in the breeze, blue eyes, fair skin, navy crewneck sweater, soft overcast light, muted park greens in bokeh, 85mm, photorealistic",
  seed: 526143807,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
