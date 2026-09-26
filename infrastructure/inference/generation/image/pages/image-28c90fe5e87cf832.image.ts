import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image28c90fe5e87cf832 = {
  id: "01a0c5f3-7a9a-72ad-89e8-ecf983be20a2",
  type: "page-type/image",
  slug: "image-28c90fe5e87cf832",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes, long dark wavy black hair, elegant graceful striking features, wearing a comfortable stylish oat-colored knit, relaxed; a warm absorbed expression with a faint gentle smile, lost in the page; curled in a deep armchair holding an open book, a cup of tea beside her, floor-to-ceiling bookshelves and soft golden lamplight, an intimate modern home library in the evening, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
