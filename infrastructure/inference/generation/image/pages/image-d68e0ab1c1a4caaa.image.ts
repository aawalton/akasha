import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD68e0ab1c1a4caaa = {
  id: "019f1838-5b33-7915-93e6-c652310c05a4",
  type: "page-type/image",
  slug: "image-d68e0ab1c1a4caaa",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A warm cozy interior at dusk, low golden lamplight, a woman with auburn hair sitting at a worn wooden table reading an open leather ledger, stacks of old books, a jug of creamy white meadowsweet flowers, a window behind showing the long summer dusk over golden fields, she looks up toward the viewer with a warm curious expression, intimate, painterly, amber lamplight and deep evening blues through the window, cinematic chiaroscuro",
  seed: 1530986891,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
