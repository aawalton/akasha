import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33876caa0cb35a0d = {
  id: "019f2d59-f127-76e4-b507-07fb42a8df6d",
  type: "page-type/image",
  slug: "image-33876caa0cb35a0d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties in a night studio, both hands lifting her wind-tangled dark hair off her neck, elbows high, head tilted, grey-green eyes locked on the viewer with a small knowing smile, moonlit gorge through the glass, sun-weathered skin, wearing only a sheer whisper-thin ivory gown falling straight with a clean deep V to her navel, nothing beneath the translucent fabric, brass headphones at her collarbones, warm lamp glow on cool night blue",
  seed: 691172754,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
