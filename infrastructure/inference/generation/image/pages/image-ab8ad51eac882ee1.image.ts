import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb8ad51eac882ee1 = {
  id: "019f28e0-65fc-772f-8be4-f84505bdd5c5",
  type: "page-type/image",
  slug: "image-ab8ad51eac882ee1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties, compact and athletic, standing on warm stone with arms crossed and her head cocked, wry teasing smirk, one eyebrow up, utterly unbothered. Long black hair in a loose low tie with an olive-green cloth band, wind-loose strands. Pale grey eyes, softly unfocused, just past the lens. Olive-green wrapped breast-band, bare stomach, small strong frame, thin leather cord necklace. Golden hour light, dry grass and boulders soft behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6901,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
