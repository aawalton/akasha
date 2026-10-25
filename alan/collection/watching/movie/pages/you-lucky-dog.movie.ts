import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const youLuckyDog = {
  id: "01a17499-4710-7e90-b7ae-0b8ff6fbefe0",
  type: "page-type/movie",
  slug: "you-lucky-dog",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "56410",
      externalLink: "https://www.themoviedb.org/movie/56410",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/You_Lucky_Dog_(2010_film)",
    },
  ],
  title: "You Lucky Dog",
  genres: ["Family", "TV Movie"],
  imdbId: "tt1509119",
  posterPath: "/zxKIp8GCJgxo44JxVfo685NYa9A.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Howdy Amazon Channel",
    "Shout! Factory Amazon Channel",
    "The Roku Channel",
    "Tubi TV",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
