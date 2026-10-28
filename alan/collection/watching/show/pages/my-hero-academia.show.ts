import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const myHeroAcademia = {
  id: "01a183d4-accc-791e-aa89-584e8bfdf927",
  type: "page-type/show",
  slug: "my-hero-academia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/my-hero-academia"],
  publishedAt: "2016-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "65930",
      externalLink: "https://www.themoviedb.org/tv/65930",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "My Hero Academia",
  streamingOn: [
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/rakuten-viki",
    "streaming-service/wetv",
  ],
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
