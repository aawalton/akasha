import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasJoy = {
  id: "01a17499-c95b-70cd-bf38-ade224dd612a",
  type: "page-type/movie",
  slug: "christmas-joy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535812",
      externalLink: "https://www.themoviedb.org/movie/535812",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Joy",
  genres: ["Family", "TV Movie", "Romance"],
  imdbId: "tt8587650",
  posterPath: "/nyBL0NqfIgMrtAGTp7W2ilosvpz.jpg",
  voteAverage: 6.472,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
