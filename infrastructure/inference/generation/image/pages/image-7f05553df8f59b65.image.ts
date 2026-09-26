import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f05553df8f59b65 = {
  id: "019f28e8-199b-77a0-ad7b-f37373a0c292",
  type: "page-type/image",
  slug: "image-7f05553df8f59b65",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a petite small-framed young woman in her mid-twenties, compact and athletic, squatting low on a bare mountain summit, wide sky and distant ranges behind her. One hand is planted down with fingers spread flat on the rock; her other hand is raised up in front of her chest, middle finger extended straight up at the sky in a defiant gesture. Cocky lopsided smirk aimed at the camera — she faces the viewer as if listening, not seeing. Pale grey eyes, unfocused. Black hair chopped short and choppy, self-cut, tousled, with a dark moss-green cloth hairband. Bare-faced, no makeup, natural sun-touched skin. Deep forest-green sports bra and dark green athletic shorts, bare feet gripping the stone. Golden light, wind, dust. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 7101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
