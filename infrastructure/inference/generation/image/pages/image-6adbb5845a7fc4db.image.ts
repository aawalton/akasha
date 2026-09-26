import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6adbb5845a7fc4db = {
  id: "01a0c5f3-7a9c-7f40-b83d-9c3b0361b2d5",
  type: "page-type/image",
  slug: "image-6adbb5845a7fc4db",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Breathtaking young woman in her early twenties wearing a sheer smoke-black gown that is transparent from the waist down with a jewelled bodice barely covering her, pale skin, long black hair, draped sideways across an obsidian throne in the underworld with a pomegranate in one hand, ankles crossed, holding the viewer's gaze with dark amusement, cold blue flame and gold veins in the stone, painterly fantasy realism\n",
  seed: 423359161,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
