import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasOrnament = {
  id: "01a17499-66a2-7084-9f63-46849f14af73",
  type: "page-type/movie",
  slug: "the-christmas-ornament",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "238018",
      externalLink: "https://www.themoviedb.org/movie/238018",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Ornament" },
  ],
  title: "The Christmas Ornament",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt3289944",
  posterPath: "/aNfEqYoL7q1Pi6C9aMiaWjSVEnB.jpg",
  voteAverage: 6.024,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
