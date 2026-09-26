import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8dd9cc20572e946 = {
  id: "01a0c5f3-7a98-71a6-962c-f60c72ecf66d",
  type: "page-type/image",
  slug: "image-e8dd9cc20572e946",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her outfit to: an elegant gown that looks like deep space and a field of stars, cosmic fabric glittering with tiny galaxies.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
