import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image536fad0ce1decd9b = {
  id: "01a0c5f3-b3ca-76f2-9f7c-274ffa8ea22e",
  type: "page-type/image",
  slug: "image-536fad0ce1decd9b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait of a beautiful young woman caught in a genuine open laugh outdoors in soft sun-dappled green park light, head tilted slightly back mid-laugh and turning to look right at you, bright happy eyes meeting yours, sun-kissed natural skin texture, loose dark hair catching the light, casual fresh tank top and open shirt, lively spontaneous and alive, shallow depth of field with soft bokeh, warm natural daylight, a real joyful unposed moment shared with you, close framing",
  seed: 449218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
