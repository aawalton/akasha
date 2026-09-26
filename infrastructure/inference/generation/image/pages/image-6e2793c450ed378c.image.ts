import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6e2793c450ed378c = {
  id: "01a0c5f3-3621-7eec-a056-9051550e73ee",
  type: "page-type/image",
  slug: "image-6e2793c450ed378c",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a confident woman in her mid-twenties at a gaming streaming setup, sharp amused smirk, looking directly into the camera, long windswept platinum-blonde hair, bright teal eyes, athletic build, wearing an oversized graphic gaming hoodie, colorful RGB keyboard and neon bokeh behind her, purple and teal LED key light, 85mm, shallow depth of field, photorealistic",
  seed: 601,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
