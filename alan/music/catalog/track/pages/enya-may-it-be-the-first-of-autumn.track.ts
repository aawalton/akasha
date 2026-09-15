import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeTheFirstOfAutumn = {
  id: "01a0a5b0-2321-7c1f-8e05-36064e872d24",
  type: "page-type/track",
  slug: "enya-may-it-be-the-first-of-autumn",
  ownLength: 3.15155,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qEuixBPBmptTONfEF5Zs1",
      externalLink: "https://open.spotify.com/track/6qEuixBPBmptTONfEF5Zs1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The First of Autumn",
} as const satisfies Track
