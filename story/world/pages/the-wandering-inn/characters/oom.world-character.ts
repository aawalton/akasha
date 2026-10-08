import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const oom = {
  id: "01a0b70c-191f-7cfc-9e76-54e007296f80",
  type: "page-type/world-character",
  slug: "oom",
  title: "Oom",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 238,
  lastChapter: 615,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:38.527Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
