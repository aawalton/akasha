import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd1c0fd19d85b316 = {
  id: "019f28e8-f030-7499-8d2a-95f5a4841d1b",
  type: "page-type/image",
  slug: "image-cd1c0fd19d85b316",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a petite compact athletic young woman in her mid-twenties squatting on the highest rock of a mountain peak, valley haze far below. Her right hand touches the summit stone, fingers spread wide like she is reading it; her left hand is lifted toward the sky, fist closed except the middle finger extended upward — flipping off the heavens with total confidence. Wry smirk, chin level, face turned to the viewer as if listening for them, gaze unfocused. Pale grey eyes. Short choppy black hair, roughly self-trimmed, strands moving in wind, dark green cloth band. Bare-faced, no makeup. Deep moss-green sports bra, dark olive athletic shorts, bare feet. Late warm light, long shadows. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 7102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
