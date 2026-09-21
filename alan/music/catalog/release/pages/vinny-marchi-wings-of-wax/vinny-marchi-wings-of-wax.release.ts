import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiWingsOfWax = {
  id: "01a0676a-d731-7025-8e77-f9cc69453c45",
  type: "page-type/release",
  slug: "vinny-marchi-wings-of-wax",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ULDMABxdqYNCfuFidESqv",
      externalLink: "https://open.spotify.com/album/3ULDMABxdqYNCfuFidESqv",
      lastSyncedAt: "2026-02-25",
    },
  ],
  title: "Wings of Wax",
} as const satisfies Release
