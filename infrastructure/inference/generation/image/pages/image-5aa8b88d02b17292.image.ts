import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5aa8b88d02b17292 = {
  id: "01a0c5f3-7a98-71eb-b987-4de5c9c978c8",
  type: "page-type/image",
  slug: "image-5aa8b88d02b17292",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Keep a cyberpunk / techwear aesthetic. Change ONLY her outfit to: a cropped neon-trimmed cyber tank top with shoulder and side cutouts — a bit more skin while staying sporty and athletic.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
