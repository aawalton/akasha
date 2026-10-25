import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sacrificesOfTheHeart = {
  id: "01a17497-382a-7265-a80a-7f97752a84b5",
  type: "page-type/movie",
  slug: "sacrifices-of-the-heart",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "199905",
      externalLink: "https://www.themoviedb.org/movie/199905",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Sacrifices_of_the_Heart" },
  ],
  title: "Sacrifices of the Heart",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0906664",
  posterPath: "/qBaICuRkAj051uu3lDvMhu5VdwP.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
