import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD4c04a212c637028 = {
  id: "01a0c5f3-7a99-7864-b6c3-f48766757d62",
  type: "page-type/image",
  slug: "image-d4c04a212c637028",
  persona: "persona/natalie",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the woman's face and identity from the FIRST image exactly — the same mature, natural, radiant features, the luminous gold eyes (honey-gold with brighter gold around the pupils), fair flawless skin, and blonde hair loosely up. Dress her in the outfit from the SECOND image: a fluffy white bunny-ears headband and a flattering fitted apron over a soft pastel blouse printed with small rabbits and radishes. Warm golden-hour kitchen behind her, faint glow. Photorealistic, the gold eyes the clear focal point, natural skin texture, high detail. She gazes at the viewer with soft delight and unmistakable warm attraction, a gentle smitten half-smile, leaning very slightly toward the camera, intimate and enchanting.",
  inputImage: "image/image-bbcf77da1a6286b6",
  referenceImages: ["image/image-83f842a301fa4bd9"],
} as const satisfies Image
