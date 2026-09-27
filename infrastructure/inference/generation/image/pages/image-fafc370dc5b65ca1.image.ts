import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFafc370dc5b65ca1 = {
  id: "01a0c5f3-7a9c-7640-ab76-9a191ef802aa",
  type: "page-type/image",
  slug: "image-fafc370dc5b65ca1",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Extremely beautiful young woman in her early twenties wearing a black sheer silk robe hanging fully open over a delicate lace bra and high-cut briefs, thigh-high stockings, long dark hair, standing in a sorceress's candlelit tower bedchamber among floating runes and old books, one hand on the bedpost, hip cocked, looking straight at the viewer with a seductive smile, warm candlelight and violet magic glow, painterly fantasy realism\n",
  seed: 1173699646,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/bedroom", "setting-tag/candlelight", "setting-tag/library"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/hand-on-hip",
    "pose-tag/looking-at-viewer",
    "pose-tag/legs-spread",
  ],
  wardrobeTags: [
    "wardrobe-tag/lingerie",
    "wardrobe-tag/bra",
    "wardrobe-tag/garter-belt",
    "wardrobe-tag/stockings",
    "wardrobe-tag/robe",
  ],
  fantasyTags: ["fantasy-tag/magic"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
