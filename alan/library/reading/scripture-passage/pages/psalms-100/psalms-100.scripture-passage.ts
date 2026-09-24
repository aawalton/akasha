import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms100 = {
  id: "01a06804-11b0-7027-9fbe-5f08bdd059cb",
  type: "page-type/scripture-passage",
  slug: "psalms-100",
  title: "Psalms 100",
  partOfCollections: ["scripture-collection/psalms"],
  position: 100,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms100",
} as const satisfies ScripturePassage
