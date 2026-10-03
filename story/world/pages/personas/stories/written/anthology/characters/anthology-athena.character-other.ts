import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const anthologyAthena = {
  id: "01a10367-7f93-7ca2-b550-8e7f7a05e65f",
  type: "page-type/character-other",
  slug: "anthology-athena",
  title: "Athena",
  story: "story-written/anthology",
  place: "place/anthology-athenas-workshop",
} as const satisfies CharacterOther
