import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image46e6d9e577fbb0b4 = {
  id: "019f1838-db58-7c38-8726-9e453398b28f",
  type: "page-type/image",
  slug: "image-46e6d9e577fbb0b4",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the entire image exactly as in the reference — identical woman, face, skin tone, eyes, hair, her exact pose, both bare shoulders with both thin straps down, the deep purple silk slip, all the pillows and cushions in their exact current colors (the blue and gold cushions stay exactly as they are), the candlelight, the warm lamp, the framing, and the mood. Do not change her, her pose, her shoulders, or the pillows in any way.\n\nChange ONLY ONE thing: the large green/teal satin cloth draped across the lower foreground and her lap is recolored to deep rich purple satin, matching her purple silk slip — so the entire foreground cloth is purple with NO green or teal remaining anywhere. Keep its exact folds, sheen, and the candlelight on it; change only its color from green to purple. Do not touch the blue or gold pillows.\n\nFRAME: Vertical portrait orientation, 2:3 aspect ratio. One subject only — her. Photorealistic, warm candlelight.",
} as const satisfies Image
