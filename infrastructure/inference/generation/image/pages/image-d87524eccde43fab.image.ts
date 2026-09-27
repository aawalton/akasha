import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD87524eccde43fab = {
  id: "019f6b28-9a97-71cc-9855-92659c71f521",
  type: "page-type/image",
  slug: "image-d87524eccde43fab",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Add a matched pair of slender swept-back ridged horns of polished gold rising from her hair above her temples, growing naturally from her head as if they are her own, and a faint scatter of tiny gold-leaf scales high on her cheekbones. Keep her face, expression, hair, dress, hands, lighting, background, and framing exactly unchanged. Photorealistic, natural skin texture.",
  inputImage: "image/image-1d6f127f3b8be467",
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/studio", "setting-tag/workshop"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/hand-on-face", "pose-tag/close-up"],
  wardrobeTags: [
    "wardrobe-tag/bare-shoulders",
    "wardrobe-tag/tube-top",
    "wardrobe-tag/glitter-makeup",
  ],
  fantasyTags: ["fantasy-tag/dragon-horns", "fantasy-tag/golden-eyes"],
} as const satisfies Image
