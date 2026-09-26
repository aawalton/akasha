import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4a1b5c79e6af91c = {
  id: "01a0c5f3-7a99-79b6-bb2d-271dfb3e42eb",
  type: "page-type/image",
  slug: "image-b4a1b5c79e6af91c",
  persona: "persona/zadi",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman of Persian and Arabic appearance, warm golden-olive skin, large dark expressive almond-shaped eyes lined with kohl, long dark wavy black hair, elegant graceful features, of the Islamic Golden Age Arabian Nights world, adorned as a queen in rich brocade and silk of deep crimson and gold, an ornate jeweled headpiece and fine golden jewelry, a sheer embroidered veil; poised serene and quietly commanding, a calm knowing gaze that has tamed a king with words alone, dignified and powerful; seated on a cushioned throne-dais in an opulent palace hall of carved arches and lamplight, regal, close upper-body portrait, painterly character portrait, intensely detailed eyes, sharp focus on the eyes",
  seed: 8003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
