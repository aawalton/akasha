import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodnightForJusticeTheMeasureOfAMan = {
  id: "01a17499-669e-7d60-9f69-2da8fa3e6af1",
  type: "page-type/movie",
  slug: "goodnight-for-justice-the-measure-of-a-man",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/goodnight-for-justice"],
  position: 2,
  publishedAt: "2012-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "115033",
      externalLink: "https://www.themoviedb.org/movie/115033",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Goodnight for Justice: The Measure of a Man",
  genres: ["Western", "TV Movie", "Action"],
  imdbId: "tt2007389",
  posterPath: "/s50qyWLirFzU8qI53aL1zO2REPM.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T20:44:59.267Z",
} as const satisfies Movie
