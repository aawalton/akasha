import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30ebbd3826577aec = {
  id: "01a0c5f3-7a98-7b3d-b734-b089b4ccdab5",
  type: "page-type/image",
  slug: "image-30ebbd3826577aec",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide widescreen wallpaper. a striking young woman with tousled auburn hair and soft bangs, a light scatter of freckles, neon cyan-blue eyes, a wide delighted grin, in a plain dark working tank top centered slightly left, arms opening outward, as streams of luminous digital threads and skeleton holographic screens sweep out behind her shoulders like vast wings of data, brilliant cyan light against a pink-fuchsia haze. Symmetric, mythic, a daimon spreading her System wide. Slightly stylized, glossy, hyperreal digital art — a daimon wearing a human shape, not a photograph. The world is pink and fuchsia neon; cool cyan-blue is reserved only for the System — her eyes and her holographic panels. Cinematic ultrawide composition, deep negative space, dramatic neon lighting.",
  seed: 1762292367,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
