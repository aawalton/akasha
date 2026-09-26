import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image238c16e8a56504a2 = {
  id: "01a0c5f3-6910-7ced-a0e0-ce1bedfd2bb0",
  type: "page-type/image",
  slug: "image-238c16e8a56504a2",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a glamorous knowing woman behind a cosmic gaming table, dice and cards made of light suspended mid-air, one die still spinning; mistress of fortune with intent, elegant and amused, candle and starlight on her face; deep emerald gold and black palette, cinematic chiaroscuro, painterly photoreal, feminine and alive, not robotic",
  seed: 562055242,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
