import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeMonopoly = {
  id: "01a0676a-d724-7080-824a-5ec9aa99ca52",
  type: "page-type/release",
  slug: "ariana-grande-monopoly",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2019-04-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MbXjBEw6FrGtcglqEDHpb",
      externalLink: "https://open.spotify.com/album/0MbXjBEw6FrGtcglqEDHpb",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "MONOPOLY",
} as const satisfies Release
