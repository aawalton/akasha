import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kissAtPineLake = {
  id: "01a17499-669f-7a2c-8391-ee5c5d59180a",
  type: "page-type/movie",
  slug: "kiss-at-pine-lake",
  ownLength: 105,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "117878",
      externalLink: "https://www.themoviedb.org/movie/117878",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Kiss at Pine Lake",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt1942900",
  posterPath: "/sQR9DeD6XTwWGcKD90yUSnKn5Me.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "Tubi TV",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
