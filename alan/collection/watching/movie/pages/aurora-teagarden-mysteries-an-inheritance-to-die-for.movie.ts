import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesAnInheritanceToDieFor = {
  id: "01a1749a-06ba-7ab3-b9f1-5a2985e56290",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-an-inheritance-to-die-for",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 11,
  publishedAt: "2019-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "590121",
      externalLink: "https://www.themoviedb.org/movie/590121",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: An Inheritance to Die For",
  genres: ["Mystery", "TV Movie", "Crime"],
  imdbId: "tt9703326",
  posterPath: "/nYkEw4fXfZnusQpR83k8GS8wBLH.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
