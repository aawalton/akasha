import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa9a9de870834f55 = {
  id: "01a0c5f3-2542-72e9-a2a7-5a32e4c98bb5",
  type: "page-type/image",
  slug: "image-ca9a9de870834f55",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up evening portrait of a woman in her early 30s, head and shoulders in three-quarter view, eyes meeting the camera directly, soft attentive expression, blonde hair down and slightly waved, blue eyes, fair skin, rust-colored casual knit, warm lamplight in a cozy room, deep soft shadows, 85mm, photorealistic",
  seed: 1533883896,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
