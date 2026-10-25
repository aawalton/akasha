import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sharingChristmas = {
  id: "01a17499-c95f-7c28-a130-f8b950089178",
  type: "page-type/movie",
  slug: "sharing-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "483558",
      externalLink: "https://www.themoviedb.org/movie/483558",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sharing Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7697712",
  posterPath: "/rbcQlnr10rmpyqGftTeZvtbKCeq.jpg",
  voteAverage: 6.2,
  streamingOn: ["The Roku Channel", "Tubi TV", "Xumo Play"],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
