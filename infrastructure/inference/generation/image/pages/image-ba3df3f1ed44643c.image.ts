import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBa3df3f1ed44643c = {
  id: "019f2d56-8735-7b0a-a148-e751ecc1c570",
  type: "page-type/image",
  slug: "image-ba3df3f1ed44643c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties at a night studio microphone, one hand resting light on the mic stand, torso angled, chin slightly lowered so her direct grey-green gaze comes up at the viewer, small knowing almost-smile, moonlit gorge and mist through the glass, wind-tangled dark hair, sun-weathered skin, wearing only a sheer whisper-thin ivory gown, straight fall, clean deep V open to the navel, nothing beneath the gauze, brass headphones at her collarbones, warm lamplight on cool night blue",
  seed: 251941051,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
