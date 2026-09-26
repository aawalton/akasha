import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB474ad42da17b041 = {
  id: "019f1838-a183-7f8e-b585-91841f41bde4",
  type: "page-type/image",
  slug: "image-b474ad42da17b041",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old but weathered and battle-worn, fair skin, warm hazel eyes still sharp and unbroken and fearless, her hair turned wispy and pale white with uneven chunks fallen away on the left side of her scalp, the top of her right ear missing, faint discolored burn scars ringing her throat and the edge of her jaw, a quiet fierce survivor's calm in her face, a woman who walked through fire and lived, wearing simple worn travel clothes, dramatic low firelight, dark atmospheric background, close upper-body portrait, photoreal, cinematic, intensely detailed eyes, natural skin texture",
  seed: 9710011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
