import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const anthologyCeri = {
  id: "01a10367-7f93-7161-a766-e66bd9f1151d",
  type: "page-type/character-other",
  slug: "anthology-ceri",
  title: "Ceri",
  story: "story-written/anthology",
  place: "place/anthology-the-screen-room",
} as const satisfies CharacterOther
