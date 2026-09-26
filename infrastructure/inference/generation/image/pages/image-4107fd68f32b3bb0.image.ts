import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4107fd68f32b3bb0 = {
  id: "019f28e3-c8ff-7507-97b5-efdb3cd0e03d",
  type: "page-type/image",
  slug: "image-4107fd68f32b3bb0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, full upper body, of a petite small-framed young woman in her mid-twenties, compact and athletic, squatting easily on a granite boulder, forearms resting on her knees, head cocked with a wry teasing smirk, one eyebrow up. Bare-faced, no makeup, natural sun-touched skin. Long black hair loosely tied back with a sage-green cloth hairband, wind-loose strands. Pale grey eyes, softly unfocused, just past the lens. Sage-green athleisure: fitted sports top and loose athletic shorts, bare feet gripping the rock. Golden hour light, dry grass and boulders soft behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6901,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
