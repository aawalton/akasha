import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e08 = {
  id: "01a183d9-6b68-78d1-a626-19bff06fe672",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e08",
  description:
    "The weather threatens to put a kibosh on enthusiasm for Kessoku Band's latest performance.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 8,
  publishedAt: "2022-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3989999",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/8",
    },
  ],
  title: "Bocchi the Rock",
  episodeType: "standard",
  stillPath: "/oDaDrtdD5x8Y436JqZDLaPEdd9b.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
