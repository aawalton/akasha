import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiReasonToLetGo = {
  id: "01a0676a-d727-7054-ab11-17bda6f9b10d",
  type: "page-type/release",
  slug: "vinny-marchi-reason-to-let-go",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2021-12-10",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2xEtRVmuPZorC66wmh4hNz",
      externalLink: "https://open.spotify.com/album/2xEtRVmuPZorC66wmh4hNz",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "reason to let go",
} as const satisfies Release
