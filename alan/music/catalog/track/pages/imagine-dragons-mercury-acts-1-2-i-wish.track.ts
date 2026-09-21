import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12IWish = {
  id: "01a0c43f-c6f6-7418-a7b3-089161d6b0cb",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-i-wish",
  ownLength: 3.455,
  ownProgress: 3.455,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1X9hG9ChkrwhViamDCZTy9",
      externalLink: "https://open.spotify.com/track/1X9hG9ChkrwhViamDCZTy9",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "I Wish",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "iwish|53XhwfbYqKCa1cC15pYq2q|207300",
  song: "song/imagine-dragons-i-wish",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 16,
      externalId: "1X9hG9ChkrwhViamDCZTy9",
      externalLink: "https://open.spotify.com/track/1X9hG9ChkrwhViamDCZTy9",
    },
  ],
} as const satisfies Track
