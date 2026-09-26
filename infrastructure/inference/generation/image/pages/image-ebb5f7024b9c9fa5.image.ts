import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEbb5f7024b9c9fa5 = {
  id: "01a0c5f4-1913-7926-bf9d-abed8339be06",
  type: "page-type/image",
  slug: "image-ebb5f7024b9c9fa5",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and fair skin tone, and the same natural hair length and texture. Keep her hair its natural light blonde color (do not darken it to brown or dishwater blonde) and keep her clear blue eyes and warm, open, lightly freckled features exactly as in the reference. Do not slim, age, beautify, or glamorize her features. Recompose the reference into ONE entirely new photograph: seated on a park bench with autumn trees behind, soft golden afternoon light, hair down, wearing a rust wool coat, soft contented smile looking at the camera. Natural skin texture, realistic photographic lighting, sharp focus on the face. photo",
  inputImage: "image/image-e878aec0e63b6951",
} as const satisfies Image
