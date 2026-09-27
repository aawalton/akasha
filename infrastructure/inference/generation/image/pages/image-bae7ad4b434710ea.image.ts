import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBae7ad4b434710ea = {
  id: "019f1839-4c47-7d20-811f-b72925467ae0",
  type: "page-type/image",
  slug: "image-bae7ad4b434710ea",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1846085380,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-58776bcfe418323f",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/forest", "setting-tag/night", "setting-tag/outdoor"],
  poseTags: [
    "pose-tag/looking-at-viewer",
    "pose-tag/hands-clasped",
    "pose-tag/standing",
    "pose-tag/portrait",
  ],
  wardrobeTags: ["wardrobe-tag/cloak", "wardrobe-tag/red-string"],
  fantasyTags: ["fantasy-tag/fairy-tale"],
} as const satisfies Image
