import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const peteSChristmas = {
  id: "01a17499-66a1-78fd-b14e-cbbd5d21f482",
  type: "page-type/movie",
  slug: "pete-s-christmas",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "237710",
      externalLink: "https://www.themoviedb.org/movie/237710",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pete's Christmas",
  genres: ["Fantasy", "Family"],
  imdbId: "tt3004544",
  posterPath: "/kUThHZFYM6mEH3REIQ76BGMdkAi.jpg",
  voteAverage: 5.696,
  streamingOn: [
    "Amazon Prime Video",
    "Amazon Prime Video with Ads",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
