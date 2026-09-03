import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const ecclesiastes = {
  id: "01a06808-34d9-701f-839a-802bb73ec407",
  pageTypeSlug: "scripture-collection",
  slug: "ecclesiastes",
  title: "Ecclesiastes",
  partOfSlugs: ["old-testament"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "ecclesiastes",
} as const satisfies ScriptureCollection
