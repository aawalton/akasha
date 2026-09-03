import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const numbers = {
  id: "01a06808-34da-701e-8896-2fa1842f5066",
  pageTypeSlug: "scripture-collection",
  slug: "numbers",
  title: "Numbers",
  partOfSlugs: ["old-testament"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "numbers",
} as const satisfies ScriptureCollection
