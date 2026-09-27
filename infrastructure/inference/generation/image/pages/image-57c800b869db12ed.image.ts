import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image57c800b869db12ed = {
  id: "01a0c5f3-3620-78a3-b8c6-b8fa4bf33d4c",
  type: "page-type/image",
  slug: "image-57c800b869db12ed",
  persona: "persona/aria",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 398525929,
  resolution: "1472",
  inputImage: "image/image-021b41354170be5a",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "FF",
  relationshipLevel: "closeness-level/level-3",
  settingTags: [
    "setting-tag/indoor",
    "setting-tag/castle",
    "setting-tag/dungeon",
    "setting-tag/night",
  ],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-at-viewer", "pose-tag/front-view"],
} as const satisfies Image
