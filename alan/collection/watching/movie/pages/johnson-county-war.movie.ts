import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const johnsonCountyWar = {
  id: "01a17497-195d-709f-9680-dc5ab39976fe",
  type: "page-type/movie",
  slug: "johnson-county-war",
  ownLength: 240,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "90474",
      externalLink: "https://www.themoviedb.org/movie/90474",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Johnson_County_War" },
  ],
  title: "Johnson County War",
  genres: ["Western", "TV Movie", "Drama"],
  imdbId: "tt0280264",
  posterPath: "/i7BDiZAFvIXVF4NWqOFzWndcfaz.jpg",
  voteAverage: 5.5,
  streamingOn: ["History Vault"],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
