import type { ShowCollection } from "../show-collection.page-type.ts"

export const shows = {
  id: "01a06808-6a77-700e-a079-27189a28901b",
  pageTypeSlug: "show-collection",
  slug: "shows",
  title: "Shows",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
