import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image483ad8ab4a1767ae = {
  id: "019f2dce-78e1-7316-9813-32caa0c5f783",
  type: "page-type/image",
  slug: "image-483ad8ab4a1767ae",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, warm chestnut-auburn hair with an iridescent opal-fire sheen glinting rose, green and gold, pale opal-grey eyes with round pupils, slender swept-back white opal horns milky with colored fire flecks, a faint scatter of iridescent opal scales high on her cheekbones. Caught mid-motion placing a small treasured artifact into its place in a glass cabinet, glancing over her shoulder at the viewer with a delighted smile. Cream silk blouse and high-waisted vintage skirt, curator elegance. Warm lamplight in a hall of labeled drawers and curiosity cabinets.",
  seed: 7102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/library", "setting-tag/museum", "setting-tag/indoor"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-back"],
  wardrobeTags: ["wardrobe-tag/shirt", "wardrobe-tag/skirt", "wardrobe-tag/long-sleeves"],
  fantasyTags: ["fantasy-tag/horns"],
} as const satisfies Image
