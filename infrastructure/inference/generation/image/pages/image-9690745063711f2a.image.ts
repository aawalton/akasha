import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9690745063711f2a = {
  id: "01a0c5f2-eb23-7faa-ac77-d6737aeac108",
  type: "page-type/image",
  slug: "image-9690745063711f2a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an elegant gothic vampire, dark Victorian gown, pale skin, subtle fangs, candlelit gothic hall, alluring expression, moody warm light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/indoor", "setting-tag/candlelight", "setting-tag/castle"],
  poseTags: [
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/portrait",
    "pose-tag/upper-body",
  ],
  wardrobeTags: [
    "wardrobe-tag/corset",
    "wardrobe-tag/velvet",
    "wardrobe-tag/high-neck",
    "wardrobe-tag/dress",
  ],
  fantasyTags: ["fantasy-tag/gothic"],
} as const satisfies Image
