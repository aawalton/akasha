import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms133 = {
  id: "01a06804-11b0-704a-9dfa-59be27bab0d1",
  type: "page-type/scripture-passage",
  slug: "psalms-133",
  title: "Psalms 133",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 133,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms133",
} as const satisfies ScripturePassage
