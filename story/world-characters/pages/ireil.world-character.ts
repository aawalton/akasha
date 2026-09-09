import type { WorldCharacter } from "../world-character.page-type.ts"

export const ireil = {
  id: "01a06580-2494-7064-908a-82ecb3940fc1",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "ireil",
  title: "Ireil",
  world: "the-wandering-inn",
  maxLevel: 5,
  eventCount: 7,
  firstChapter: 674,
  lastChapter: 674,
} as const satisfies WorldCharacter
