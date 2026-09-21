import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiBigBadWolf = {
  id: "01a0676a-d718-7056-8258-fbf97b748be8",
  type: "page-type/release",
  slug: "vinny-marchi-big-bad-wolf",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-11-26",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2x14lXJuZnHNAfzVG4fZ8i",
      externalLink: "https://open.spotify.com/album/2x14lXJuZnHNAfzVG4fZ8i",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Big Bad Wolf",
} as const satisfies Release
