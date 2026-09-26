import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16a1f471fdfad4f7 = {
  id: "01a0c5f3-3620-7f1a-8275-af96549ab33d",
  type: "page-type/image",
  slug: "image-16a1f471fdfad4f7",
  persona: "persona/amy",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and fair skin tone, and the same natural hair length and texture. Keep her hair its natural light blonde color (do not darken it to brown or dishwater blonde) and keep her clear blue eyes and warm, open, lightly freckled features exactly as in the reference. Do not slim, age, beautify, or glamorize her features. Photorealistic with natural skin detail, 1024x1024. Change only her pose, framing, hair styling, makeup, clothing, setting, and expression: Shared experiences: dates, travel, activities — the camera is *with* her. Walking beside you down a tree-lined avenue in low golden afternoon light, an autumn coat on and a paper cup of coffee in hand, half-turned toward the camera mid-laugh at something you just said — the warm, candid closeness of a shared afternoon out together. Shot on an 85mm portrait lens, under soft natural daylight.",
  inputImage: "image/image-e878aec0e63b6951",
} as const satisfies Image
