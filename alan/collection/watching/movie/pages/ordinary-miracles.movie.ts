import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ordinaryMiracles = {
  id: "01a17497-382a-767d-b713-bdb7bb03db98",
  type: "page-type/movie",
  slug: "ordinary-miracles",
  ownLength: 99,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "99312",
      externalLink: "https://www.themoviedb.org/movie/99312",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Ordinary_Miracles" },
  ],
  title: "Ordinary Miracles",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt0184799",
  posterPath: "/tndN41xyEFBLvKUslEtzbP84zPB.jpg",
  voteAverage: 6.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
