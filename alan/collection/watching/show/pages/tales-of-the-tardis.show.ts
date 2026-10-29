import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const talesOfTheTardis = {
  id: "01a06802-9332-7040-abe2-62dd3411b3b1",
  type: "page-type/show",
  slug: "tales-of-the-tardis",
  title: "Tales of the TARDIS",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/tales-of-the-tardis",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "238486", externalLink: "https://www.themoviedb.org/tv/238486" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Show
