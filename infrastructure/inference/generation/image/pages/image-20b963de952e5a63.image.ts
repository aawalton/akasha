import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20b963de952e5a63 = {
  id: "01a0c5f3-2542-7675-94d4-bed0c8bb3e7d",
  type: "page-type/image",
  slug: "image-20b963de952e5a63",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s at a cafe table mid-conversation, leaning in slightly, attentive warm expression, blonde hair tucked behind one ear, blue eyes, fair skin, ivory blouse, espresso cup on the table, soft daylight from large windows, 85mm, bokeh background, photorealistic skin texture",
  seed: 771327578,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
