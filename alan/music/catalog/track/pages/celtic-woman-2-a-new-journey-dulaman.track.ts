import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyDulaman = {
  id: "01a0abea-74ed-7f21-9005-1d4b0c192834",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-dulaman",
  ownLength: 3.0917666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6s4tmVUNIhCFzwdikt4l5m",
      externalLink: "https://open.spotify.com/track/6s4tmVUNIhCFzwdikt4l5m",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Dúlaman",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|185506",
} as const satisfies Track
