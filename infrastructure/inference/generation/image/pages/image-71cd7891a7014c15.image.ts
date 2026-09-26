import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71cd7891a7014c15 = {
  id: "019f2d5e-2810-7d1b-9adc-8c021d7133ce",
  type: "page-type/image",
  slug: "image-71cd7891a7014c15",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties seated sideways at a mixing console at night, twisted at the waist to face the viewer fully, one arm draped along the console edge, moonlit canyon mist through the window, tangled dark hair over one shoulder, warm sun-weathered skin, grey-green eyes meeting the camera, lips parted mid-word, wearing only a sheer gauzy ivory gown falling straight with a clean deep V to her navel, nothing worn beneath it, vintage brass headphones at her collarbones",
  seed: 847971940,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
