import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2f5489b490f12c68 = {
  id: "01a0c5f4-1913-78da-a73b-23f79de6161e",
  type: "page-type/image",
  slug: "image-2f5489b490f12c68",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and fair skin tone, and the same natural hair length and texture. Keep her hair its natural light blonde color (do not darken it to brown or dishwater blonde) and keep her clear blue eyes and warm, open, lightly freckled features exactly as in the reference. Do not slim, age, beautify, or glamorize her features. Recompose the reference into ONE entirely new photograph: half-body three-quarter view in a pottery studio with shelves of ceramics, soft warm light, hair tied back, wearing a clay-dusted apron over a tee, focused calm expression. Natural skin texture, realistic photographic lighting, sharp focus on the face. photo",
  inputImage: "image/image-e878aec0e63b6951",
} as const satisfies Image
