import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theTownChristmasForgot = {
  id: "01a17499-470f-7447-852a-b5d34ef0028b",
  type: "page-type/movie",
  slug: "the-town-christmas-forgot",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2010-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168090",
      externalLink: "https://www.themoviedb.org/movie/168090",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Town Christmas Forgot",
  genres: ["Comedy", "TV Movie", "Family"],
  imdbId: "tt1720276",
  posterPath: "/vnTNAtXuTa3CsP1566tyYkIiRWV.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
