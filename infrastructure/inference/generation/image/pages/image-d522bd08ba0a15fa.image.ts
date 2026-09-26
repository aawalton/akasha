import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD522bd08ba0a15fa = {
  id: "01a0c5f2-eb1d-71a2-b978-5818d0415e9f",
  type: "page-type/image",
  slug: "image-d522bd08ba0a15fa",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sleek navy cocktail dress at a rooftop evening event, city lights bokeh behind her, warm golden light, elegant smile, 85mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
