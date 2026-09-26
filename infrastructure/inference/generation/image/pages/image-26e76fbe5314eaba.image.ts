import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26e76fbe5314eaba = {
  id: "01a0c5f3-7a98-74fb-b6c8-341350e7e03c",
  type: "page-type/image",
  slug: "image-26e76fbe5314eaba",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Keep a cyberpunk / techwear aesthetic. Change ONLY her outfit to: an asymmetric one-shoulder cyberpunk top with a glowing neon edge, baring one shoulder and arm.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
