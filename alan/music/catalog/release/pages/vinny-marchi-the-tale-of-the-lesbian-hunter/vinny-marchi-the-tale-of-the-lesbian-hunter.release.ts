import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheTaleOfTheLesbianHunter = {
  id: "01a0676a-d72e-7013-b953-74ec14e4a90c",
  type: "page-type/release",
  slug: "vinny-marchi-the-tale-of-the-lesbian-hunter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-03-15",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1M4hMi1LW2VxIgy408fbyH",
      externalLink: "https://open.spotify.com/album/1M4hMi1LW2VxIgy408fbyH",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The Tale of the Lesbian Hunter",
} as const satisfies Release
