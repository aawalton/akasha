import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallWhereCanITurnForPeace = {
  id: "01a0676a-d731-7007-92af-518692603e16",
  type: "page-type/release",
  slug: "paul-cardall-where-can-i-turn-for-peace",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-06-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bqJzuXO1nQtmzJIQzDtXt",
      externalLink: "https://open.spotify.com/album/6bqJzuXO1nQtmzJIQzDtXt",
    },
  ],
  title: "Where Can I Turn for Peace?",
} as const satisfies Release
