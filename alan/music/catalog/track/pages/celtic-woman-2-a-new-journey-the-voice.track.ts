import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyTheVoice = {
  id: "01a0abea-75d9-70f2-96c6-ecc47bb8aeb1",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-voice",
  ownLength: 3.08955,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2E3y6X63fbZCYJGELwRAWQ",
      externalLink: "https://open.spotify.com/track/2E3y6X63fbZCYJGELwRAWQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Voice",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thevoice|6NWtt9pNOL2Gx7kBykdE5x|185373",
} as const satisfies Track
