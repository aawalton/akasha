import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTasteOfRomance = {
  id: "01a17499-669c-7ed4-ab85-a068d992324c",
  type: "page-type/movie",
  slug: "a-taste-of-romance",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85887",
      externalLink: "https://www.themoviedb.org/movie/85887",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Taste_of_Romance" },
  ],
  title: "A Taste of Romance",
  genres: ["Family", "Romance", "Drama", "Comedy", "TV Movie"],
  imdbId: "tt1849868",
  posterPath: "/zWfmGfvkzdyUiO256wC6z2ugaRh.jpg",
  voteAverage: 6.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
