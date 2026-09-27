import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0b45454a226e7754 = {
  id: "01a0c5f3-7a98-7d2c-8444-144c98733f72",
  type: "page-type/image",
  slug: "image-0b45454a226e7754",
  persona: "persona/iris",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep this exact image unchanged EXCEPT her clothing: same woman, same face, same delighted grin, same leaned-in close pose and direct eye contact, the same skeleton holographic windows around her, the same pink-and-magenta neon haze background and composition, and the same slightly stylized glossy synthwave art style — do NOT make it more photorealistic. Keep a cyberpunk / techwear aesthetic. Change ONLY her outfit to: a black techwear harness bralette top made of neon-lit straps over bare shoulders and bare midriff, cyberpunk style.",
  inputImage: "image/image-4bce3559375e0c86",
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/studio"],
  poseTags: [
    "pose-tag/close-up",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/leaning-forward",
  ],
  wardrobeTags: ["wardrobe-tag/harness", "wardrobe-tag/crop-top"],
  fantasyTags: ["fantasy-tag/cyberpunk", "fantasy-tag/hologram", "fantasy-tag/sci-fi"],
  ethnicityTags: ["ethnicity-tag/white"],
} as const satisfies Image
