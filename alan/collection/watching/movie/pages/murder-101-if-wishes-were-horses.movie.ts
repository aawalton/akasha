import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murder101IfWishesWereHorses = {
  id: "01a17497-3829-7092-9115-90b24a141e84",
  type: "page-type/movie",
  slug: "murder-101-if-wishes-were-horses",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/murder-101"],
  position: 3,
  publishedAt: "2007-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "73909",
      externalLink: "https://www.themoviedb.org/movie/73909",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Murder_101:_If_Wishes_Were_Horses",
    },
  ],
  title: "Murder 101: If Wishes Were Horses",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt1002572",
  posterPath: "/6qM1vlxAEMKSx10YIv1FuFhKnjL.jpg",
  voteAverage: 7.111,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
