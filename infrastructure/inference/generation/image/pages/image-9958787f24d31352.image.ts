import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9958787f24d31352 = {
  id: "019f2d5f-f81e-7b0d-a940-4ff4eede93b3",
  type: "page-type/image",
  slug: "image-9958787f24d31352",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties in a night recording studio, both hands resting lightly on the headphones around her neck as if about to lift them, elbows soft, head tilted with a listening smile, grey-green eyes locked on the viewer, moonlit canyon mist glowing through the window behind her, wind-tangled dark brown hair falling loose, warm sun-weathered skin, wearing only a sheer gauzy ivory robe, straight fall, clean deep V to her navel, bare skin faintly visible through the translucent fabric",
  seed: 18851025,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
