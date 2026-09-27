import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC66712ea3600d5e8 = {
  id: "019f1838-6174-7b01-8161-c3130bc82646",
  type: "page-type/image",
  slug: "image-c66712ea3600d5e8",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 743704750,
  softness: 0.45,
  resolution: "1488",
  inputImage: "image/image-595835d66f59355c",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/field", "setting-tag/outdoor", "setting-tag/nature"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/smiling", "pose-tag/portrait"],
} as const satisfies Image
