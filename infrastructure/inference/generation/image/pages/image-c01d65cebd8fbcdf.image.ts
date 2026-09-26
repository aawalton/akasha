import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC01d65cebd8fbcdf = {
  id: "01a0c5f3-7a98-7226-b700-d5f581c109f1",
  type: "page-type/image",
  slug: "image-c01d65cebd8fbcdf",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Keep a cyberpunk / techwear aesthetic. Change ONLY her outfit to: a cropped cyberpunk techwear jacket with glowing neon piping worn open over a black bralette, baring her midriff and décolletage.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
