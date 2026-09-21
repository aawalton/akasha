import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheDragonbornComes = {
  id: "01a0676a-d72d-7002-8c2d-23d6efb74d62",
  type: "page-type/release",
  slug: "vinny-marchi-the-dragonborn-comes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-02-17",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6o1xnMi24paxZDW42TtZaH",
      externalLink: "https://open.spotify.com/album/6o1xnMi24paxZDW42TtZaH",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The Dragonborn Comes",
} as const satisfies Release
