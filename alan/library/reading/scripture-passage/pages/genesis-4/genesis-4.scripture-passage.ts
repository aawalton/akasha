import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const genesis4 = {
  id: "01a06804-11ad-7031-856e-441ab8516003",
  type: "page-type/scripture-passage",
  slug: "genesis-4",
  title: "Genesis 4",
  partOfCollections: ["scripture-collection/genesis"],
  book: "Genesis",
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "genesis4",
} as const satisfies ScripturePassage
