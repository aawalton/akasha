import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1bc778d4e83e56d9 = {
  id: "01a0c5f3-7a99-76a2-9c4d-dad28c9f921b",
  type: "page-type/image",
  slug: "image-1bc778d4e83e56d9",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes lined with kohl, long dark wavy black hair, elegant graceful features, of the Islamic Golden Age Arabian Nights world, wearing modest elegant scholar's silks with a soft veil over her hair, faint ink staining her fingertips; thoughtful intelligent and absorbed, a quiet composing expression as if shaping the next line in her mind, perceptive and deep; seated at a low writing desk strewn with manuscripts and scrolls, an inkpot and a slender reed qalam pen and an open book of tales, in a candlelit Persian library of arched shelves, warm amber light, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
