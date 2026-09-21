import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiMyMotherToldMe = {
  id: "01a0676a-d725-7033-a6f2-bc73b979b80c",
  type: "page-type/release",
  slug: "vinny-marchi-my-mother-told-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-01-21",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2c539SW88zFrXJpYB531iV",
      externalLink: "https://open.spotify.com/album/2c539SW88zFrXJpYB531iV",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "My Mother Told Me",
} as const satisfies Release
