import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const wednesday = {
  id: "01a06802-9333-700e-9d40-1efa47023a87",
  type: "page-type/show",
  slug: "wednesday",
  title: "Wednesday",
  partOfCollections: ["show-collection/award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  publishedAt: "2022-11-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/wednesday",
      lastSyncedAt: "2026-01-02",
    },
    { source: "tmdb", externalId: "119051", externalLink: "https://www.themoviedb.org/tv/119051" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:48:56.509Z",
} as const satisfies Show
