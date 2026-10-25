import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSUnfoldingDream = {
  id: "01a17497-3828-7353-ae67-1524c7348e51",
  type: "page-type/movie",
  slug: "love-s-unfolding-dream",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "49857",
      externalLink: "https://www.themoviedb.org/movie/49857",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Unfolding_Dream" },
  ],
  title: "Love's Unfolding Dream",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0960143",
  posterPath: "/7OCcCfioaoUS1q5nemO8uSciKRj.jpg",
  voteAverage: 7,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
