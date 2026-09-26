import type { CharacterOther } from "akasha/story/character/other/character-other.page-type.types.ts"

export const partnersAelwyn = {
  id: "01a0de45-1c8d-7a57-9a7b-7e99685f1fd4",
  type: "page-type/character-other",
  slug: "partners-aelwyn",
  title: "Aelwyn",
  story: "story-played/partners",
  place: "place/partners-hearthholt",
} as const satisfies CharacterOther
