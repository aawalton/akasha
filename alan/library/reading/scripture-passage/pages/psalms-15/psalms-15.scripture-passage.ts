import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms15 = {
  id: "01a06804-11b0-705c-87f2-e5654fab667c",
  type: "page-type/scripture-passage",
  slug: "psalms-15",
  title: "Psalms 15",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms15",
} as const satisfies ScripturePassage
