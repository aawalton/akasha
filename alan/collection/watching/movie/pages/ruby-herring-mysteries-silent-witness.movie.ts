import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rubyHerringMysteriesSilentWitness = {
  id: "01a1749a-06bf-74d6-9c2b-de72a10ca9f1",
  type: "page-type/movie",
  slug: "ruby-herring-mysteries-silent-witness",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/ruby-herring-mysteries"],
  position: 1,
  publishedAt: "2019-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "571798",
      externalLink: "https://www.themoviedb.org/movie/571798",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ruby Herring Mysteries: Silent Witness",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt9466236",
  posterPath: "/d72vNuC2KdS1cDwwKf8AGA5b27U.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
