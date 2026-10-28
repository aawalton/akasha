import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const deathNote = {
  id: "01a183d2-adb2-7273-9aa9-e19191c681d9",
  type: "page-type/show",
  slug: "death-note",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/death-note"],
  publishedAt: "2006-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "13916", externalLink: "https://www.themoviedb.org/tv/13916" },
  ],
  title: "Death Note",
  createdAt: "2026-10-28T18:43:04.751Z",
  updatedAt: "2026-10-28T18:43:04.751Z",
} as const satisfies Show
