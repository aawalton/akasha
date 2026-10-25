import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justTheWayYouAre = {
  id: "01a17499-8946-7162-8283-758e407160cb",
  type: "page-type/movie",
  slug: "just-the-way-you-are",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "323673",
      externalLink: "https://www.themoviedb.org/movie/323673",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Just the Way You Are",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4380580",
  posterPath: "/gnH2ONPcIkdXVsl2fkXaFVRvPjL.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
