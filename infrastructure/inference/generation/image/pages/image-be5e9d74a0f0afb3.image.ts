import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBe5e9d74a0f0afb3 = {
  id: "01a0c5f3-3620-7f2f-81cd-f8935a53d994",
  type: "page-type/image",
  slug: "image-be5e9d74a0f0afb3",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s in a blooming garden, head and shoulders turned 45 degrees from the camera, eyes looking back into the lens with direct warm contact, soft smile, long straight blonde hair with a side part, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, soft floral summer sundress with thin straps and bare shoulders, dappled afternoon sunlight, greenery in bokeh, 85mm, shallow depth of field, photorealistic",
  seed: 401,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
