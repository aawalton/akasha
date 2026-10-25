import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const notesFromDad = {
  id: "01a17499-66a0-7330-be42-e957548a5583",
  type: "page-type/movie",
  slug: "notes-from-dad",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "219980",
      externalLink: "https://www.themoviedb.org/movie/219980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Notes From Dad",
  genres: ["TV Movie", "Family", "Romance"],
  imdbId: "tt2202800",
  posterPath: "/ucZitOEuSIxGfxd6kkcFTS61Gnu.jpg",
  voteAverage: 5.7,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
