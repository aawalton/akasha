import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86e8498adaebc680 = {
  id: "01a0c5f3-3620-7dd9-9d15-586ccf5a36ef",
  type: "page-type/image",
  slug: "image-86e8498adaebc680",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s sitting on a picnic blanket in a leafy park, body angled 45 degrees, head turned back to the camera with direct warm eye contact, soft amused smile, long straight blonde hair with a side part, naturally pretty face with soft features, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, floral summer sundress with thin straps and bare shoulders, soft shade light with sun-dappled grass in bokeh, 85mm, photorealistic",
  seed: 405,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
