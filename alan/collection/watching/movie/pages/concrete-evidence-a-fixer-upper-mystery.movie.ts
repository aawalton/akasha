import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const concreteEvidenceAFixerUpperMystery = {
  id: "01a17499-c95b-7963-b2ae-d8bf8b7c4f81",
  type: "page-type/movie",
  slug: "concrete-evidence-a-fixer-upper-mystery",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/fixer-upper-mysteries"],
  position: 2,
  publishedAt: "2017-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "446864",
      externalLink: "https://www.themoviedb.org/movie/446864",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Concrete Evidence: A Fixer Upper Mystery",
  genres: ["Mystery", "Crime", "TV Movie"],
  imdbId: "tt6740584",
  posterPath: "/fOeHQ3J9ZOfpXDEoVUQ06L2haec.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
