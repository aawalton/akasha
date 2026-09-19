import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rois = {
  id: "01a0b70c-9c0d-7733-8eb8-ad8da5081aa7",
  type: "page-type/world-character",
  slug: "rois",
  title: "Rois",
  world: "world/the-wandering-inn",
  firstChapter: 50,
  lastChapter: 50,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
