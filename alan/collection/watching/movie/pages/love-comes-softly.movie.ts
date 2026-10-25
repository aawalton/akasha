import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveComesSoftly = {
  id: "01a17497-195d-7d10-ac18-c366b3daa366",
  type: "page-type/movie",
  slug: "love-comes-softly",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "16250",
      externalLink: "https://www.themoviedb.org/movie/16250",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love_Comes_Softly" },
  ],
  title: "Love Comes Softly",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0345591",
  posterPath: "/shyGlG9BJtb8k201XP6R17niKU5.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
