import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiBewareOfTheSiren = {
  id: "01a0676a-d718-7053-8c71-aff5c0ae08ee",
  type: "page-type/release",
  slug: "vinny-marchi-beware-of-the-siren",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-06-22",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KTdQJCWMIUegWC2sQYWKr",
      externalLink: "https://open.spotify.com/album/1KTdQJCWMIUegWC2sQYWKr",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Beware of the Siren",
} as const satisfies Release
