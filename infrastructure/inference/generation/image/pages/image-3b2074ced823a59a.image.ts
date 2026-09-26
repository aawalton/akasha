import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3b2074ced823a59a = {
  id: "019f2d58-5438-7591-a864-e429622e19ad",
  type: "page-type/image",
  slug: "image-3b2074ced823a59a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties at a night studio microphone, caught mid-laugh with her head tipping back slightly, eyes still on the viewer, moonlit gorge and mist through the glass behind her, wind-tangled dark brown hair, sun-weathered skin with faint freckles, wearing only a sheer whisper-thin ivory drape, straight fall, clean deep V open to her navel, nothing beneath the gauze, brass headphones at her collarbones, warm lamplight",
  seed: 148807167,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
