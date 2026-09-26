import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image15ff90ba84c31c77 = {
  id: "019f18ff-f423-7b8e-92be-ebc9adcd74c8",
  type: "page-type/image",
  slug: "image-15ff90ba84c31c77",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait, chest-up, of a timelessly beautiful young woman with long dark wavy hair, holding up a warm glowing antique lantern in the encircling darkness of night. Golden lantern-light pools across her serene, compassionate face and her hand; deep black gloom behind her. Her eyes are calm, deep, ancient and unafraid — gentle, tender, meeting the viewer with unconditional love. Soft warm chiaroscuro, candle-gold light against darkness, cinematic, photoreal, natural skin texture, shallow depth of field. A kind and safe, comforting presence in the dark.",
  seed: 201,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
