import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iMNotReadyForChristmas = {
  id: "01a17499-8946-70ff-8442-eec0c5164bc7",
  type: "page-type/movie",
  slug: "i-m-not-ready-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363478",
      externalLink: "https://www.themoviedb.org/movie/363478",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I'm Not Ready for Christmas",
  genres: ["Family", "TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt5182120",
  posterPath: "/qjos0Ijhp2w2AhDtVhN4vrwCmMS.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
