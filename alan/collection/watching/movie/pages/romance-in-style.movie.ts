import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceInStyle = {
  id: "01a1749a-464d-76b6-98bc-daaec7cd6236",
  type: "page-type/movie",
  slug: "romance-in-style",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "994052",
      externalLink: "https://www.themoviedb.org/movie/994052",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance in Style",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21653744",
  posterPath: "/gYcVRws4Hu5B36ji7BheKDnSbfP.jpg",
  voteAverage: 6.57,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
