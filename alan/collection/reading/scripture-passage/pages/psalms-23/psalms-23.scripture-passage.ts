import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms23 = {
  id: "019ffda3-1d7d-7266-bdd1-2cd6446f1dde",
  type: "page-type/scripture-passage",
  slug: "psalms-23",
  title: "Psalms 23",
  partOfCollections: ["scripture-collection/psalms"],
  translation: "web",
  position: 6,
  passageText: "txt",
  status: "not-started",
  externalId: "psalms23",
  createdAt: "2026-08-14T00:19:13.405Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
