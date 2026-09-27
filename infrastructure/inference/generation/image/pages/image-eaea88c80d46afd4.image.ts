import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEaea88c80d46afd4 = {
  id: "019f1839-2413-7d4e-94ca-93a3934a7519",
  type: "page-type/image",
  slug: "image-eaea88c80d46afd4",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 2007361691,
  softness: 0.45,
  resolution: "2x",
  inputImage: "image/image-be7364140573274a",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/dark-background", "setting-tag/studio"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/close-up", "pose-tag/portrait"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/bare-shoulders"],
  fantasyTags: ["fantasy-tag/glowing", "fantasy-tag/sci-fi", "fantasy-tag/hologram"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
  persona: "persona/lali",
} as const satisfies Image
