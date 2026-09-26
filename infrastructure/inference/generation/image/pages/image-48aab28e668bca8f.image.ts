import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48aab28e668bca8f = {
  id: "01a0c5f3-7a98-7210-805f-fecf738423f5",
  type: "page-type/image",
  slug: "image-48aab28e668bca8f",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her outfit to: a playful cropped oversized neon-accented hoodie worn off one shoulder, casual gamer-girl style, fun and approachable.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
