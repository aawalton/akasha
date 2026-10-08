import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const officialDeclaration = {
  id: "01a06808-34da-7020-8f84-83cebda4e275",
  type: "page-type/scripture-collection",
  slug: "official-declaration",
  title: "Official Declaration",
  partOfCollections: ["scripture-collection/doctrine-and-covenants"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "officialdeclaration",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
