import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE348d7070b46c0f4 = {
  id: "019f1903-9940-7139-8fdd-d9ebba3e2bbc",
  type: "page-type/image",
  slug: "image-e348d7070b46c0f4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait, chest-up, of a timelessly beautiful young Caucasian woman with clear pale fair skin, long dark wavy hair, and soft red lips, in the encircling darkness of night. She carries a small antique lantern held low and to one side, its warm glow rising softly onto her; the lantern is modest, not dominating — she is the subject. Her irises glow with luminous warm golden lantern-light, as if a gentle flame lives within her eyes — luminous, beautiful, alive. Her face is serene and compassionate, her gaze ancient, calm, unafraid, tender, meeting the viewer with unconditional love. Soft warm chiaroscuro, candle-gold against deep darkness, cinematic, photoreal, natural skin texture, shallow depth of field. A kind, safe, comforting presence in the dark.",
  seed: 204,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
