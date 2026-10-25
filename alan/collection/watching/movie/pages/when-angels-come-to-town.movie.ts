import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenAngelsComeToTown = {
  id: "01a17497-382b-7dd6-99b6-447860f33969",
  type: "page-type/movie",
  slug: "when-angels-come-to-town",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "205868",
      externalLink: "https://www.themoviedb.org/movie/205868",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/When_Angels_Come_to_Town" },
  ],
  title: "When Angels Come to Town",
  genres: ["Drama", "Family", "Fantasy"],
  imdbId: "tt0438580",
  posterPath: "/kIk0RcHS9SvOa7vCya50IdCcHj2.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
