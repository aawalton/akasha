import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD0a607147bd86d42 = {
  id: "01a0c5f3-f000-7088-a37f-fb034994a5f9",
  type: "page-type/image",
  slug: "image-d0a607147bd86d42",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a slender young woman in her late twenties with Welsh features — long dark hair with an iridescent silver-blue starling-wing sheen, pale skin, pale silver-blue eyes with round pupils, slender swept-back mother-of-pearl horns in dark silver-blue nacre, a faint scatter of iridescent silver-blue scales high on her cheekbones — standing at a towering library shelf at night, one arm raised pulling down a ribbon-tied manuscript, glancing over her shoulder at the viewer with quiet amusement, candle sconces along the shelves, moonlight pooling on the floor, deep blue dress with a fitted bodice",
  seed: 396065152,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
