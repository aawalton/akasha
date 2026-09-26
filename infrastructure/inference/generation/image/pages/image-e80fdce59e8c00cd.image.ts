import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE80fdce59e8c00cd = {
  id: "01a0c5f3-7a98-7f53-ba48-62468b8e64e7",
  type: "page-type/image",
  slug: "image-e80fdce59e8c00cd",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged in every way EXCEPT color: the same woman, her face, her delighted grin, her leaned-in close pose and direct eye contact, the skeleton holographic windows, the composition, and the slightly stylized glossy synthwave art style (do not make it more photorealistic). Change ONLY the color scheme. Make ALL of the haze, the ambient glow, the background, and the neon light falling on her skin and hair pure warm PINK, MAGENTA, PURPLE and FUCHSIA — remove every trace of blue, cyan, and teal from the haze, the background, and the lighting on her. Reserve cool BLUE / CYAN for EXACTLY two things: the glowing holographic skeleton screen panels (they stay system-blue) and her eyes (bright system-blue). The blue screens should read as the only cool element glowing against an all-pink-and-fuchsia world.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
