import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6fe99fd092852e53 = {
  id: "01a0c5f3-7a98-7bfa-9c49-ceb56916c11c",
  type: "page-type/image",
  slug: "image-6fe99fd092852e53",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her outfit to: a sleek black futuristic techwear jacket with glowing neon piping and utility straps over a fitted top — edgy cyber-streetwear.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
