import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tulipsInSpring = {
  id: "01a17499-a7d8-70bd-98f6-af8618211c53",
  type: "page-type/movie",
  slug: "tulips-in-spring",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "393658",
      externalLink: "https://www.themoviedb.org/movie/393658",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Tulips in Spring",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt5605328",
  posterPath: "/j6pYwERCBcsxrnEgn2DQFghlXHm.jpg",
  voteAverage: 5.845,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
