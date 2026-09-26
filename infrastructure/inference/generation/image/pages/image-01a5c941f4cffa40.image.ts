import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image01a5c941f4cffa40 = {
  id: "01a0c5f3-7a99-7ce4-bb4b-0621f068cbdd",
  type: "page-type/image",
  slug: "image-01a5c941f4cffa40",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes lined with kohl, long dark wavy black hair, elegant graceful features, of the Islamic Golden Age Arabian Nights world, wearing flowing silk robes in deep jewel tones with delicate gold embroidery and a sheer veil draped softly over her hair, simple elegant gold jewelry; caught mid-story with her lips just parted as she speaks, eyes bright and alight with the tale she is weaving, captivating and warm and spellbinding, drawing the listener in; seated among richly patterned cushions in a warm lamplit palace chamber at night, glowing oil lamps, intricate carpets and carved arches, golden firelight, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
