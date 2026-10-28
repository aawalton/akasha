import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gintamaTheVeryFinal = {
  id: "01a183d6-422d-715b-803e-010bff1e7820",
  type: "page-type/movie",
  slug: "gintama-the-very-final",
  ownLength: 104,
  ownProgress: 0,
  partOfCollections: ["fandom/gintama"],
  publishedAt: "2021-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "732203",
      externalLink: "https://www.themoviedb.org/movie/732203",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Gintama: The Very Final",
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Crunchyroll",
    "Crunchyroll Amazon Channel",
    "Fandango at Home Free",
    "The Roku Channel",
  ],
  createdAt: "2026-10-28T18:46:59.373Z",
  updatedAt: "2026-10-28T19:47:20.762Z",
} as const satisfies Movie
