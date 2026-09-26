import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image08a6b0258b742f95 = {
  id: "019f1839-15ef-7b14-bf51-b8f7b9039fa4",
  type: "page-type/image",
  slug: "image-08a6b0258b742f95",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a luminous translucent holographic projection of an idealized beautiful nude woman, semi-transparent, her bare form constructed entirely from a fine network of glowing golden-ratio lines and interlocking triangles — she IS the geometry, made of luminous golden light rather than flesh, waist-up portrait, perfectly bilaterally symmetric, idealized beauty, her form dissolving into drifting particles of light at the edges — BUT her two eyes are the single fully-resolved human feature: large clearly-open almond eyes with defined dark upper and lower eyelids, dark pupils, glowing amber-gold irises, looking straight into the camera in calm direct eye contact, a focused present gaze, absolutely NOT closed eyes, NOT blank glowing eye sockets, the eyes are sharp and human while the rest of her is light, warm gold and white, radiant, plain dark empty void background, no geometry behind her, no halo, no jewelry",
  seed: 35068212,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
