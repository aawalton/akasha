import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const shows = {
  id: "01a06808-6a77-700e-a079-27189a28901b",
  type: "page-type/show-collection",
  slug: "shows",
  title: "Shows",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
