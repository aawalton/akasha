import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1aed0aeefc422579 = {
  id: "01a0c5f3-7a99-74b7-962a-af6cc5572c5f",
  type: "page-type/image",
  slug: "image-1aed0aeefc422579",
  persona: "persona/natalie",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the woman's face and identity from the FIRST image exactly — the same mature, natural, radiant features, the luminous gold eyes (honey-gold with brighter gold around the pupils), fair flawless skin, and blonde hair loosely up. Dress her in the outfit from the SECOND image: a fluffy white bunny-ears headband and a flattering fitted apron over a soft pastel blouse printed with small rabbits and radishes. Warm golden-hour kitchen behind her, faint glow. Photorealistic, the gold eyes the clear focal point, natural skin texture, high detail. A lively candid moment: she is caught mid-genuine-laugh, glancing warmly at the viewer, one hand lightly resting on her apron, alive with delight in the warm kitchen.",
  inputImage: "image/image-bbcf77da1a6286b6",
  referenceImages: ["image/image-83f842a301fa4bd9"],
} as const satisfies Image
