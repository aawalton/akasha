import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1343884a527b9299 = {
  id: "01a0c5f3-7a98-7f4d-b9d2-4f562370093f",
  type: "page-type/image",
  slug: "image-1343884a527b9299",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her outfit to: a glossy iridescent holographic bodysuit that shimmers with shifting neon colors, sleek and form-fitting.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
