import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyBeyondTheSea = {
  id: "01a0abea-750a-7232-b9c6-b8174acb0038",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-beyond-the-sea",
  ownLength: 3.328883333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mjpTAOF23vrpTU5B1pqsT",
      externalLink: "https://open.spotify.com/track/7mjpTAOF23vrpTU5B1pqsT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Beyond The Sea",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "beyondthesea|6NWtt9pNOL2Gx7kBykdE5x|199733",
  song: "song/celtic-woman-beyond-the-sea",
} as const satisfies Track
