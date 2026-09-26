import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image386e4fd1c9195e78 = {
  id: "01a0c5f3-7a99-7120-aff7-aaf3858e947a",
  type: "page-type/image",
  slug: "image-386e4fd1c9195e78",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes lined with kohl, long dark wavy black hair, elegant graceful features, of the Islamic Golden Age Arabian Nights world, looking youthful and bright, wearing simpler graceful silks in warm tones with a light veil loosely draped, modest jewelry; a clever spark in her eyes and a warm faint knowing smile, quick and alive and brave, the brilliant girl who outwits the dark with a single story, approachable and luminous; in a softly lamplit chamber with warm textiles and gentle golden light, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
