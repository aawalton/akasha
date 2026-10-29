import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const daredevil = {
  id: "01a06802-9331-7017-adc1-8d535db36d7b",
  type: "page-type/show",
  slug: "daredevil",
  title: "Daredevil",
  partOfCollections: ["fandom/marvel-television"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-daredevil",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "202555", externalLink: "https://www.themoviedb.org/tv/202555" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Show
