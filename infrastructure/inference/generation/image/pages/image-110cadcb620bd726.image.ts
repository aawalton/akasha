import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image110cadcb620bd726 = {
  id: "01a0c5f3-7a98-77de-8291-59b06b304b55",
  type: "page-type/image",
  slug: "image-110cadcb620bd726",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image nearly identical: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Change ONLY her top: remove all the glowing neon blue/cyan trim from it. She now wears a simple plain black ribbed working camisole, matte fabric, no glowing edges at all. Keep the rest identical. The only blue in the frame is the screens and her eyes.",
  inputImage: "image/image-4bce3559375e0c86",
} as const satisfies Image
