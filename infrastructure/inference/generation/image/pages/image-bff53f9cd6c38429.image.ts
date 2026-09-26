import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBff53f9cd6c38429 = {
  id: "01a0c5f3-7a9a-7285-9fdf-4203573143ba",
  type: "page-type/image",
  slug: "image-bff53f9cd6c38429",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes, long dark wavy black hair, elegant graceful striking features, wearing a chic modern camel coat over a simple top; a bright thoughtful expression glancing up as if caught mid-idea, a pen in hand; seated at a small café table with an open notebook and a cup of coffee, soft daylight through a large window, a warm contemporary urban café, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
