import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5066361904bc2c9c = {
  id: "01a0c5f3-8d0c-7acd-8b78-8a5240920f19",
  type: "page-type/image",
  slug: "image-5066361904bc2c9c",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman waist-deep in calm golden-hour ocean water, turning toward you with her face lighting up in delight that it is you, warm direct eye contact, water droplets on sun-kissed skin, wet hair pushed back, simple swimsuit, soft glowing sunset light on the water, gentle motion as she moves toward you, shallow depth of field with soft bokeh, intimate alive and joyful, close framing, hands relaxed at the water not reaching toward the camera",
  seed: 821046,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
