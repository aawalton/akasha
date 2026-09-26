import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e379c3764bceb25 = {
  id: "01a0c5f3-7a98-7b7c-9581-2a36502ba124",
  type: "page-type/image",
  slug: "image-1e379c3764bceb25",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact woman — her face, her playful delighted grin, her leaned-in close pose and direct eye contact, her outfit. CRITICAL: keep the existing art style and rendering exactly as-is — the slightly stylized glossy synthwave neon look and the rich, balanced electric magenta-and-cyan color and lighting. Do NOT make it more photorealistic; do not change the art style or the palette. Change only the background: replace the consoles and chairs with a more fully abstract neon atmosphere — the same bright magenta-and-cyan lighting bath, but the space behind her is pure soft glow and out-of-focus bokeh, no identifiable shapes at all. Turn the floating interface windows into abstract SKELETON panels — glowing holographic frames and rounded rectangles with only placeholder bars, blocks, an avatar silhouette, and soft shimmer where text would be. NO legible words, NO numbers, NO readable LEVEL UP text. Keep several windows floating around her.",
  inputImage: "image/image-fe432f8d17190781",
} as const satisfies Image
