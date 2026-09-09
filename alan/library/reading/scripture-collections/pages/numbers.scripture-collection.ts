import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const numbers = {
  id: "01a06808-34da-701e-8896-2fa1842f5066",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "numbers",
  title: "Numbers",
  partOfCollections: ["old-testament"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "numbers",
} as const satisfies ScriptureCollection
