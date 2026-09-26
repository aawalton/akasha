import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBbd749cc57e39c61 = {
  id: "01a0c5f3-7a98-7760-bf05-b3bb1124d4b2",
  type: "page-type/image",
  slug: "image-bbd749cc57e39c61",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "This is a 21:9 ultrawide desktop wallpaper, widescreen aspect. The woman on the right is Iris — keep her EXACTLY as in the reference: same face, tousled auburn hair with soft bangs, freckles, bright cyan System-blue eyes (color only, not glowing), her warm delighted grin, plain dark tank, in the same slightly stylized glossy style (NOT photorealistic). Compose the rest of the wide frame into one cohesive scene around her: a deep pink-and-fuchsia neon haze filling the space, and her glowing cyan holographic SKELETON system-windows — frames with placeholder bars and an avatar silhouette, no legible text — fanning out across the centre and left of the frame as if she is conjuring them. Keep the left third calmer and more open, atmospheric negative space suitable for desktop icons. Cinematic, moody, gorgeous. Maintain the full 21:9 widescreen composition; do not crop to square or portrait.",
  inputImage: "image/image-fa8824f81a1481b8",
  referenceImages: ["image/image-21fb7f3e04b32963"],
} as const satisfies Image
