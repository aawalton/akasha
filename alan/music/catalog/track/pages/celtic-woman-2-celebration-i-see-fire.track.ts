import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationISeeFire = {
  id: "01a0abea-562a-7bbc-89cc-fb16bb709d18",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-i-see-fire",
  ownLength: 5.15155,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2IS1snn7mqeQB2CYCvsPQo",
      externalLink: "https://open.spotify.com/track/2IS1snn7mqeQB2CYCvsPQo",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I See Fire",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "iseefire|6NWtt9pNOL2Gx7kBykdE5x|309093",
  song: "song/celtic-woman-i-see-fire",
} as const satisfies Track
