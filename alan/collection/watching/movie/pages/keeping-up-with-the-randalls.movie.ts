import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const keepingUpWithTheRandalls = {
  id: "01a17499-669f-7478-b292-998755fb8909",
  type: "page-type/movie",
  slug: "keeping-up-with-the-randalls",
  ownLength: 108,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "109233",
      externalLink: "https://www.themoviedb.org/movie/109233",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Keeping Up with the Randalls",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt1754400",
  posterPath: "/yclUKU5IYEfNqlR4uotqtEQDu0l.jpg",
  voteAverage: 6.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
