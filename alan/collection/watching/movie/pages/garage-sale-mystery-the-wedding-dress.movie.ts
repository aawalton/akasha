import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryTheWeddingDress = {
  id: "01a17499-8945-7c34-8d67-a71b395d5107",
  type: "page-type/movie",
  slug: "garage-sale-mystery-the-wedding-dress",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 3,
  publishedAt: "2015-08-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "348630",
      externalLink: "https://www.themoviedb.org/movie/348630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: The Wedding Dress",
  genres: ["Family", "TV Movie", "Mystery", "Drama"],
  imdbId: "tt4658324",
  posterPath: "/xae9wfwffK0QQ0VT8nyQkj19RvW.jpg",
  voteAverage: 6.073,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
