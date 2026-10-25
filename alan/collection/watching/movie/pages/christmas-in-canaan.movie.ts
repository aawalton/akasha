import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInCanaan = {
  id: "01a17499-470b-7266-a89e-6dcf52ef40f9",
  type: "page-type/movie",
  slug: "christmas-in-canaan",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-canaan"],
  position: 1,
  publishedAt: "2009-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "144253",
      externalLink: "https://www.themoviedb.org/movie/144253",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Christmas_in_Canaan" },
  ],
  title: "Christmas in Canaan",
  genres: ["Family", "Drama", "TV Movie"],
  imdbId: "tt1410013",
  posterPath: "/72ERMKvJx1kNOv8tJhq9CBPs0Um.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
