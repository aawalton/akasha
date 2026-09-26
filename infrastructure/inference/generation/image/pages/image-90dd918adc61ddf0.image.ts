import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image90dd918adc61ddf0 = {
  id: "01a0c5f3-7a9a-7864-8f33-7598101efcf5",
  type: "page-type/image",
  slug: "image-90dd918adc61ddf0",
  persona: "persona/zadi",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes, long dark wavy black hair, elegant graceful striking features, wearing a soft elegant cream knit sweater, modern and understated; a warm thoughtful intelligent expression, mid-thought as she writes, a faint absorbed half-smile; seated at a contemporary writing desk with an open laptop, a notebook and pen, a stack of books and a warm desk lamp, a cozy modern study in the evening with softly-lit bookshelves behind her, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
