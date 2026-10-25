import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTimeToRemember = {
  id: "01a17497-3824-710f-bf6f-5c9f544c8682",
  type: "page-type/movie",
  slug: "a-time-to-remember",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "184981",
      externalLink: "https://www.themoviedb.org/movie/184981",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/A_Time_to_Remember_(film)",
    },
  ],
  title: "A Time to Remember",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0368382",
  posterPath: "/jfI1AApNruSMOX9j9BKcpBbjCWs.jpg",
  voteAverage: 6.8,
  streamingOn: ["PixL Amazon Channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
