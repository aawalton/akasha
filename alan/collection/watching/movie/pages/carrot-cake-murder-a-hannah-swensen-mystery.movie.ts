import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const carrotCakeMurderAHannahSwensenMystery = {
  id: "01a1749a-89a7-7603-829f-70c6257d3e02",
  type: "page-type/movie",
  slug: "carrot-cake-murder-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 7,
  publishedAt: "2023-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093396",
      externalLink: "https://www.themoviedb.org/movie/1093396",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Carrot Cake Murder: A Hannah Swensen Mystery",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt26928076",
  posterPath: "/yLYAq5d6pk8mXKzigfwcBn543lf.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
