import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const returnToThePlanetOfTheApes = {
  id: "01a06802-9332-7019-8809-7266f138f2bb",
  type: "page-type/show",
  slug: "return-to-the-planet-of-the-apes",
  title: "Return to the Planet of the Apes",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1975-09-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/return-to-the-planet-of-the-apes",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "12443", externalLink: "https://www.themoviedb.org/tv/12443" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:39:56.532Z",
} as const satisfies Show
