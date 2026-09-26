import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6a6fc59f0a7bcfd0 = {
  id: "01a00ff0-36c6-7d54-9469-b34bbda9fe57",
  type: "page-type/image",
  slug: "image-6a6fc59f0a7bcfd0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties wearing a sheer iridescent bodysuit with glowing seams that conceals almost nothing, over-knee boots, silver-blonde hair, lounging sideways across a curved couch in a neon space-opera pleasure lounge, one leg extended along the seat, looking at the viewer with a slow smile, magenta and turquoise light and starfield windows, painterly science fiction realism\n",
  seed: 212630147,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
