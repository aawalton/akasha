import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheBastardInTheKitchen = {
  id: "01a0676a-d72c-7029-a83c-5ee82fd8bb7b",
  type: "page-type/release",
  slug: "vinny-marchi-the-bastard-in-the-kitchen",
  title: "The Bastard in the Kitchen",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 1.890383,
  ownProgress: 1.890383,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2024-03-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xdykKic6zAHaNSuLjnQTI",
      externalLink: "https://open.spotify.com/album/0xdykKic6zAHaNSuLjnQTI",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
