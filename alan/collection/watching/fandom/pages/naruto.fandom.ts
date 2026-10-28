import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const naruto = {
  id: "01a183ce-6791-7562-96ac-86af237baa01",
  type: "page-type/fandom",
  slug: "naruto",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom-collection/anime-top-100"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  title: "Naruto",
  createdAt: "2026-10-28T18:38:24.650Z",
  updatedAt: "2026-10-28T18:38:24.650Z",
} as const satisfies Fandom
