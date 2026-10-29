import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS02e02 = {
  id: "01a1887d-dc26-7ac9-93ea-c4b06f737d9f",
  type: "page-type/episode",
  slug: "arcane-s02e02",
  description:
    "With Piltover ready for war, the Undercity weighs its options. Jinx lies low and plots her next move. A pivotal conversation takes place.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/arcane-season-2"],
  position: 2,
  publishedAt: "2024-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5609642",
      externalLink: "https://www.themoviedb.org/tv/94605/season/2/episode/2",
    },
  ],
  title: "Watch It All Burn",
  episodeType: "standard",
  stillPath: "/z2MSNefctJYAYGdPJQUcxRcZWTh.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
