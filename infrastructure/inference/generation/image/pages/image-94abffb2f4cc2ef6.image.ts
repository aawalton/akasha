import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image94abffb2f4cc2ef6 = {
  id: "019f2d4d-02f4-7c25-a50e-3f67cad687d3",
  type: "page-type/image",
  slug: "image-94abffb2f4cc2ef6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic waist-up portrait of a young woman in her mid-twenties in a night recording studio, glass wall behind her open to a moonlit canyon with rising mist, wind-tangled dark brown hair, warm sun-weathered skin, grey-green eyes looking directly into the camera with calm attentive eye contact, wearing a sheer gauzy off-white ivory gown falling straight from the shoulders with a clean deep V-neckline plunging to her navel, translucent fabric catching the lamplight, vintage headphones around her neck, lips slightly parted, warm console glow against cool moonlight",
  seed: 1056085441,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
