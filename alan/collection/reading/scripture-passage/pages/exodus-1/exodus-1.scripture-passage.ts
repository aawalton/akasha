import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const exodus1 = {
  id: "01a06804-11ac-7017-8618-53affa74dd3f",
  type: "page-type/scripture-passage",
  slug: "exodus-1",
  title: "Exodus 1",
  partOfCollections: ["scripture-collection/exodus"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "exodus1",
} as const satisfies ScripturePassage
