import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationTheChristmasSong = {
  id: "01a0abea-76fc-7293-8a5f-10c964008809",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-the-christmas-song",
  ownLength: 3.596,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1S0OZ3pdQohICDTJToDU8O",
      externalLink: "https://open.spotify.com/track/1S0OZ3pdQohICDTJToDU8O",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Christmas Song",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thechristmassong|6NWtt9pNOL2Gx7kBykdE5x|215760",
  song: "song/celtic-woman-the-christmas-song",
} as const satisfies Track
