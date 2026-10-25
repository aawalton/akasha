import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasBellsAreRinging = {
  id: "01a17499-e801-71d4-91ad-b2627992c26f",
  type: "page-type/movie",
  slug: "christmas-bells-are-ringing",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "555281",
      externalLink: "https://www.themoviedb.org/movie/555281",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Bells are Ringing",
  genres: ["Family", "TV Movie", "Comedy", "Romance"],
  imdbId: "tt9202096",
  posterPath: "/bJV4HVbYZMblIEa1bqk6mSHQ5YJ.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
