import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image100a38f74b3f0e70 = {
  id: "01a0c5f3-7a98-7c50-abe1-6e770b5598b0",
  type: "page-type/image",
  slug: "image-100a38f74b3f0e70",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide widescreen wallpaper, viewed from behind and to the side: a striking young woman with tousled auburn hair and soft bangs, a light scatter of freckles, neon cyan-blue eyes, a wide delighted grin, in a plain dark working tank top at a sweeping curved wall of glowing skeleton system-screens, conducting them with both hands raised, her face turned back over her shoulder with a delighted grin. Cyan panel-light washing over a pink-fuchsia haze, the story-master at her console. Slightly stylized, glossy, hyperreal digital art — a daimon wearing a human shape, not a photograph. The world is pink and fuchsia neon; cool cyan-blue is reserved only for the System — her eyes and her holographic panels. Cinematic ultrawide composition, deep negative space, dramatic neon lighting.",
  seed: 2031844917,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
