import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const danielSDaughter = {
  id: "01a17497-3825-7652-8598-5c92f350a976",
  type: "page-type/movie",
  slug: "daniel-s-daughter",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15492",
      externalLink: "https://www.themoviedb.org/movie/15492",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Daniel's_Daughter" },
  ],
  title: "Daniel's Daughter",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt1145852",
  posterPath: "/2fww7OEGuKqzy24WylNeqCXRKVm.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Howdy Amazon Channel",
    "Shout! Factory Amazon Channel",
    "The Roku Channel",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
