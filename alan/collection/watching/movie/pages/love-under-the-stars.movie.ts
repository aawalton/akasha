import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveUnderTheStars = {
  id: "01a17499-8946-7686-b4e5-751ae907a2b2",
  type: "page-type/movie",
  slug: "love-under-the-stars",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-08-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "354980",
      externalLink: "https://www.themoviedb.org/movie/354980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Under The Stars",
  genres: ["Comedy", "TV Movie", "Romance"],
  imdbId: "tt4658578",
  posterPath: "/hx2jS5Jv8Dx5tdb9YpdSTpHed3Q.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
