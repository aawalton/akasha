import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const anthologyAelwyn = {
  id: "01a10367-7f92-74c7-884a-9106c9d04f9a",
  type: "page-type/character-other",
  slug: "anthology-aelwyn",
  title: "Aelwyn",
  story: "story-written/anthology",
  place: "place/anthology-the-heater-room",
} as const satisfies CharacterOther
