import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1b648242e48d8bbc = {
  id: "01a0c5f4-03a6-749d-923c-61edbd29e0e8",
  type: "page-type/image",
  slug: "image-1b648242e48d8bbc",
  subjects: "FFM",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/dungeon"],
  poseTags: ["pose-tag/fighting", "pose-tag/squatting"],
  wardrobeTags: [
    "wardrobe-tag/armor",
    "wardrobe-tag/leather",
    "wardrobe-tag/sheet",
    "wardrobe-tag/boots",
  ],
  fantasyTags: ["fantasy-tag/elf-ears", "fantasy-tag/magic", "fantasy-tag/weapons"],
} as const satisfies Image
