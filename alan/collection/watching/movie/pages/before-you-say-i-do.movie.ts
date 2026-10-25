import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const beforeYouSayIDo = {
  id: "01a17499-470b-7441-9dc4-253d8b1c4b24",
  type: "page-type/movie",
  slug: "before-you-say-i-do",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "48281",
      externalLink: "https://www.themoviedb.org/movie/48281",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Before_You_Say_I_Do" },
  ],
  title: "Before You Say I Do",
  genres: ["Comedy", "Romance", "Fantasy", "TV Movie"],
  imdbId: "tt1318522",
  posterPath: "/9fOpao3RE7bHNcuZG9MjBSRSs02.jpg",
  voteAverage: 5.6,
  streamingOn: ["Fandango at Home Free", "Peacock Premium", "Peacock Premium Plus", "Tubi TV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
