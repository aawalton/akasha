import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image46767bcd9a43d201 = {
  id: "01a0c5f3-3620-7914-ae90-8cdc1bfa14d0",
  type: "page-type/image",
  slug: "image-46767bcd9a43d201",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s at the beach at golden hour, head and shoulders turned 45 degrees from the camera, eyes looking back into the lens with direct warm contact, relaxed smile, long straight blonde hair with a side part lifted slightly by sea breeze, naturally pretty face with soft features, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, pale yellow summer sundress with thin straps and bare shoulders, warm low sun and soft ocean bokeh, 85mm, photorealistic",
  seed: 402,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
