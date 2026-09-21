import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLeaveThisParty = {
  id: "01a0676a-d722-7069-8912-82b3ce90e916",
  type: "page-type/release",
  slug: "vinny-marchi-leave-this-party",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-02-09",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o9Giqdrd69JZEhXOI6XRV",
      externalLink: "https://open.spotify.com/album/1o9Giqdrd69JZEhXOI6XRV",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Leave This Party",
} as const satisfies Release
