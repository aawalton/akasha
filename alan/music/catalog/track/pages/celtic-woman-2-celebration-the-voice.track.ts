import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationTheVoice = {
  id: "01a0abea-55b6-7756-a883-1faea43928fb",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-the-voice",
  ownLength: 3.1542166666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GqP0wqFPUMxdfxYlNdegr",
      externalLink: "https://open.spotify.com/track/4GqP0wqFPUMxdfxYlNdegr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Voice",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thevoice|6NWtt9pNOL2Gx7kBykdE5x|189253",
} as const satisfies Track
