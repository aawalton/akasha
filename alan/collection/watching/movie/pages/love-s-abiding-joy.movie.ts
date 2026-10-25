import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSAbidingJoy = {
  id: "01a17497-3827-7ebc-9b89-9ab15d272635",
  type: "page-type/movie",
  slug: "love-s-abiding-joy",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "22488",
      externalLink: "https://www.themoviedb.org/movie/22488",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Abiding_Joy" },
  ],
  title: "Love's Abiding Joy",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0785025",
  posterPath: "/bnaJeSqEy4svDD0zaEdgoXtY4ug.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
