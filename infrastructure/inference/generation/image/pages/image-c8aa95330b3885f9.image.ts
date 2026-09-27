import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8aa95330b3885f9 = {
  id: "01a0c5f3-3620-7da3-83b6-90fa45fc2c6f",
  type: "page-type/image",
  slug: "image-c8aa95330b3885f9",
  persona: "persona/aria",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 335388313,
  resolution: "1440",
  inputImage: "image/image-7e5e9e1883efcd42",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/castle", "setting-tag/night", "setting-tag/candlelight"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/side-by-side",
  ],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/corset",
    "wardrobe-tag/off-shoulder",
    "wardrobe-tag/bare-shoulders",
    "wardrobe-tag/cleavage",
    "wardrobe-tag/glitter-makeup",
  ],
  fantasyTags: ["fantasy-tag/horns", "fantasy-tag/wings", "fantasy-tag/elf-ears"],
} as const satisfies Image
