import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const xFiles = {
  id: "01a06808-6a77-7018-9efe-6fe48d04cfca",
  type: "page-type/show-collection",
  slug: "x-files",
  title: "X-Files",
  partOfCollections: [
    "fandom-collection/science-fiction-fandoms",
    "show-collection/speculative-antholoagies",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  tags: ["Speculative Anthology", "Crime Investigation"],
} as const satisfies ShowCollection
