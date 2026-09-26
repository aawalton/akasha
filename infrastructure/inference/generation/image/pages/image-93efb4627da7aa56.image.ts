import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image93efb4627da7aa56 = {
  id: "01a0c5f3-2542-7970-b775-51f63e81dab6",
  type: "page-type/image",
  slug: "image-93efb4627da7aa56",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a cafe table, body in three-quarter view, glancing toward the camera with direct eye contact and an amused warm smile, blonde hair tucked behind one ear and falling loose, blue eyes, fair skin, ivory casual blouse, soft daylight from large windows, 85mm, bokeh background, photorealistic",
  seed: 1669950574,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
