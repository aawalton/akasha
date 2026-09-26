import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image007aa9d2c85e2a01 = {
  id: "019f28ea-9a4f-7964-b495-b03bff4a0aea",
  type: "page-type/image",
  slug: "image-007aa9d2c85e2a01",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a tiny young woman about four foot eight, very short compact frame, small stature, athletic, in her mid-twenties, squatting low on a bare mountain summit, wide sky and distant ranges behind her. One hand is planted down with fingers spread flat on the rock; her other hand is raised up in front of her chest, middle finger extended straight up at the sky in a defiant gesture. Broad lopsided smirk, one corner of her mouth lifted high, visibly amused and teasing, aimed at the camera — she faces the viewer as if listening, not seeing. Pale grey eyes, unfocused. Black hair chopped short and choppy, self-cut, tousled, with a dark moss-green cloth hairband. Bare-faced, no makeup, natural sun-touched skin. Deep forest-green sports bra and dark green athletic shorts, bare feet gripping the stone. Golden light, wind, dust. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 7101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
