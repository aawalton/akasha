import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const spiritedAway = {
  id: "01a183d5-d057-7041-b2ac-4af505a55bdc",
  type: "page-type/movie",
  slug: "spirited-away",
  ownLength: 125,
  ownProgress: 0,
  partOfCollections: ["fandom/spirited-away"],
  publishedAt: "2001-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "129",
      externalLink: "https://www.themoviedb.org/movie/129",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Spirited Away",
  streamingOn: ["HBO Max", "HBO Max Amazon Channel"],
  createdAt: "2026-10-28T18:46:30.231Z",
  updatedAt: "2026-10-28T19:48:13.665Z",
} as const satisfies Movie
