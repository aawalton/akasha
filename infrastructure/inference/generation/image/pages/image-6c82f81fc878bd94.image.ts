import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c82f81fc878bd94 = {
  id: "01a0c5f4-1913-7efd-ba78-c3aa98e89a44",
  type: "page-type/image",
  slug: "image-6c82f81fc878bd94",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and fair skin tone, and the same natural hair length and texture. Keep her hair its natural light blonde color (do not darken it to brown or dishwater blonde) and keep her clear blue eyes and warm, open, lightly freckled features exactly as in the reference. Do not slim, age, beautify, or glamorize her features. Recompose the reference into ONE entirely new photograph: half-body three-quarter view on a green forest path with dappled light, soft natural daylight, hair in a ponytail, wearing a khaki utility jacket, calm serene expression. Natural skin texture, realistic photographic lighting, sharp focus on the face. photo",
  inputImage: "image/image-e878aec0e63b6951",
} as const satisfies Image
