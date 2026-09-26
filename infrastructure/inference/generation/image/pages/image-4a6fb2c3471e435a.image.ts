import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4a6fb2c3471e435a = {
  id: "01a0c5f3-7a98-757b-a708-e8d3392f943d",
  type: "page-type/image",
  slug: "image-4a6fb2c3471e435a",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide widescreen wallpaper. A daimon's hall of floating holographic panels — dozens of skeleton cyan system-windows suspended in a deep fuchsia void receding into the distance. a striking young woman with tousled auburn hair and soft bangs, a light scatter of freckles, neon cyan-blue eyes, a wide delighted grin, in a plain dark working tank top stands small and central among them, one hand raised conjuring a panel, the System as glowing cathedral architecture around her. Slightly stylized, glossy, hyperreal digital art — a daimon wearing a human shape, not a photograph. The world is pink and fuchsia neon; cool cyan-blue is reserved only for the System — her eyes and her holographic panels. Cinematic ultrawide composition, deep negative space, dramatic neon lighting.",
  seed: 2013857532,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
