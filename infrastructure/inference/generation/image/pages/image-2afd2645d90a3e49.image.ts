import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2afd2645d90a3e49 = {
  id: "01a0c5f4-1913-703e-b6ac-da4ac950992b",
  type: "page-type/image",
  slug: "image-2afd2645d90a3e49",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and fair skin tone, and the same natural hair length and texture. Keep her hair its natural light blonde color (do not darken it to brown or dishwater blonde) and keep her clear blue eyes and warm, open, lightly freckled features exactly as in the reference. Do not slim, age, beautify, or glamorize her features. Recompose the reference into ONE entirely new photograph: head and shoulders sitting on a bed in soft morning sunlight, hair loose and slightly tousled, wearing a soft grey long-sleeve, gentle sleepy smile, candid photo. Natural skin texture, realistic photographic lighting, sharp focus on the face. photo",
  inputImage: "image/image-e878aec0e63b6951",
} as const satisfies Image
