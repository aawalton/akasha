import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const itSChristmasCarol = {
  id: "01a17499-669f-7e11-8894-dd9730c3bfae",
  type: "page-type/movie",
  slug: "it-s-christmas-carol",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "151071",
      externalLink: "https://www.themoviedb.org/movie/151071",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/It's_Christmas,_Carol!" },
  ],
  title: "It's Christmas, Carol!",
  genres: ["TV Movie", "Family", "Fantasy"],
  imdbId: "tt2181853",
  posterPath: "/gpj8MSZD3NDfFtFUX4rUuCmix3j.jpg",
  voteAverage: 5.5,
  streamingOn: ["MovieSphere+ Amazon Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
