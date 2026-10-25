import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideTheDoctorIsOutReallyOut = {
  id: "01a17497-3828-76d4-ba9d-e5a0b82db6c5",
  type: "page-type/movie",
  slug: "mcbride-the-doctor-is-out-really-out",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 4,
  publishedAt: "2005-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "254400",
      externalLink: "https://www.themoviedb.org/movie/254400",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: The Doctor Is Out... Really Out",
  genres: ["Mystery"],
  imdbId: "tt0434185",
  posterPath: "/V9DhwaRRq6iu7IXKf6Iwq5fguA.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
