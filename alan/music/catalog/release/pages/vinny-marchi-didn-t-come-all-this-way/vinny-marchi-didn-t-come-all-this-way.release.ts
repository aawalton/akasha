import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiDidnTComeAllThisWay = {
  id: "01a0676a-d71c-7011-bf86-bdf0ea52eea3",
  type: "page-type/release",
  slug: "vinny-marchi-didn-t-come-all-this-way",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-12-20",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5VTxgJlioyyD4i9Nj3YM9N",
      externalLink: "https://open.spotify.com/album/5VTxgJlioyyD4i9Nj3YM9N",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Didn't Come All This Way",
} as const satisfies Release
