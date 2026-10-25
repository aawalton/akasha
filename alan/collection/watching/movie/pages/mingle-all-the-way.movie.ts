import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mingleAllTheWay = {
  id: "01a17499-e804-76f9-b5ae-dcc176fc470c",
  type: "page-type/movie",
  slug: "mingle-all-the-way",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550022",
      externalLink: "https://www.themoviedb.org/movie/550022",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mingle All the Way",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt9033628",
  posterPath: "/kUSeiqBWSiOA1mYRVPlaJjJRp5t.jpg",
  voteAverage: 7.06,
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
