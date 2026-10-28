import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const evangelion20YouCanNotAdvance = {
  id: "01a183d4-cefc-7388-bedf-ad8efeb4b412",
  type: "page-type/movie",
  slug: "evangelion-2-0-you-can-not-advance",
  ownLength: 112,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "2009-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "22843",
      externalLink: "https://www.themoviedb.org/movie/22843",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Evangelion: 2.0 You Can (Not) Advance",
  streamingOn: ["Amazon Prime Video", "Amazon Prime Video with Ads"],
  createdAt: "2026-10-28T18:45:24.348Z",
  updatedAt: "2026-10-28T19:47:02.840Z",
} as const satisfies Movie
