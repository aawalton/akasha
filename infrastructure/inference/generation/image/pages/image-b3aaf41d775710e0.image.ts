import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB3aaf41d775710e0 = {
  id: "01a0c5f3-7a9c-7d0c-85f8-84e1a2d6aa9c",
  type: "page-type/image",
  slug: "image-b3aaf41d775710e0",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — soft green-gold skin, hair of soft moss-green woven with spring flowers, her raiment grown from living leaves and blossoms and curling green tendrils that still seem to be growing, a crown of fresh spring flowers, dappled light through leaves, a gentle radiant expression — a fae whose very gown is alive, clear bright green eyes, delicately pointed fae ears, a warm tender expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-4",
  settingTags: ["setting-tag/outdoor", "setting-tag/nature", "setting-tag/forest"],
  poseTags: ["pose-tag/portrait", "pose-tag/looking-at-viewer", "pose-tag/upper-body"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/flower-crown"],
  fantasyTags: ["fantasy-tag/cosplay", "fantasy-tag/elf-ears", "fantasy-tag/green-hair"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
