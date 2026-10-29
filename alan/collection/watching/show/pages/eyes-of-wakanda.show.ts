import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const eyesOfWakanda = {
  id: "01a06802-9331-7024-990e-898979aaa7e3",
  type: "page-type/show",
  slug: "eyes-of-wakanda",
  title: "Eyes of Wakanda",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 53,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-08-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/eyes-of-wakanda",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "241388", externalLink: "https://www.themoviedb.org/tv/241388" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:30:02.248Z",
} as const satisfies Show
