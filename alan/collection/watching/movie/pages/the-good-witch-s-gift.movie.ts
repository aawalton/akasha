import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSGift = {
  id: "01a17499-470e-7aca-9920-18207b5b55ba",
  type: "page-type/movie",
  slug: "the-good-witch-s-gift",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 3,
  publishedAt: "2010-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61005",
      externalLink: "https://www.themoviedb.org/movie/61005",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Gift" },
  ],
  title: "The Good Witch's Gift",
  genres: ["Drama", "Family", "Fantasy"],
  imdbId: "tt1560779",
  posterPath: "/cw6gQD0QRS3MA3bdGnAqQYSYhdr.jpg",
  voteAverage: 7.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
