import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf9e5fa1d1e7a517 = {
  id: "01a0c5f3-7a98-7cfc-b6a9-5fc091c35d65",
  type: "page-type/image",
  slug: "image-cf9e5fa1d1e7a517",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her outfit to: an elegant fitted dark dress traced all over with glowing neon circuit lines, as if the System runs through the fabric.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
