import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e09 = {
  id: "01a18853-1b89-774b-8eee-2f9ce06ce428",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e09",
  description:
    "Finally arriving at the coordinates, the Infinity crew discovers a hidden planet – and the long-awaited identity of their mysterious messenger.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 9,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230743",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/9",
    },
  ],
  title: "The Devourer of All Things (1)",
  episodeType: "standard",
  stillPath: "/4Vc8so4IjX44ouGJVD4P28ZEnFk.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
