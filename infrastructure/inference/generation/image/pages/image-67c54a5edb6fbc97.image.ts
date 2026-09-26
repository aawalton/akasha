import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67c54a5edb6fbc97 = {
  id: "01a0c5f4-1913-7b0e-b2c6-0ae06b5a29eb",
  type: "page-type/image",
  slug: "image-67c54a5edb6fbc97",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties standing in a night studio, caught mid-step toward the viewer as if just called, weight shifting forward, one hand rising toward her brass headphones at her collarbones, grey-green eyes bright and direct on the camera, lips parted about to answer, moonlit gorge and drifting mist through the glass wall behind, wind-tangled dark brown hair, warm sun-weathered skin, wearing only a sheer whisper-thin ivory gown falling straight with a clean deep V open to her navel, nothing beneath the gauze",
  seed: 587775350,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
