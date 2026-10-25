import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelsSing = {
  id: "01a17499-8944-7ada-9e7a-1dcd86f8c0a4",
  type: "page-type/movie",
  slug: "angels-sing",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "57210",
      externalLink: "https://www.themoviedb.org/movie/57210",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Angels Sing",
  genres: ["Comedy", "Family", "Drama"],
  imdbId: "tt1833888",
  posterPath: "/cQMtS4bUyufS8hivsYKLM2Ctcqq.jpg",
  voteAverage: 5.5,
  streamingOn: ["Angel Studios", "Plex", "Plex Channel", "The CW"],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
