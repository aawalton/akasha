import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image352d9fc4c54e9ebd = {
  id: "019f28e5-6adf-7443-a1b0-e3e0c4989fee",
  type: "page-type/image",
  slug: "image-352d9fc4c54e9ebd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a petite small-framed young woman in her mid-twenties, compact and athletic, squatting low on bare bedrock with one hand's fingertips touching the stone between her feet, as if reading it, the other forearm on her knee, head tilted with a small knowing smirk. Bare-faced, no makeup, natural sun-touched skin. Long black hair loosely gathered with a sage-green cloth band, escaped strands. Pale grey eyes, softly unfocused. Sage-green athleisure top and shorts, bare feet. Low warm light, dust in the air, boulders soft behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 7002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
