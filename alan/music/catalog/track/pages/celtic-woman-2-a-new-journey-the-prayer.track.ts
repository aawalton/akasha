import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyThePrayer = {
  id: "01a0abea-7458-78a5-aaa2-cf4238f0cc2f",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-prayer",
  ownLength: 4.326216666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3sJ2sVxfWZJFM7OBSQCNFy",
      externalLink: "https://open.spotify.com/track/3sJ2sVxfWZJFM7OBSQCNFy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Prayer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "theprayer|6NWtt9pNOL2Gx7kBykdE5x|259573",
  song: "song/celtic-woman-the-prayer",
} as const satisfies Track
