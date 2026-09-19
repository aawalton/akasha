import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeBeStill = {
  id: "01a0abea-5a1d-7d47-bebd-5d46117d964c",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-be-still",
  ownLength: 1.5942166666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2YwrKRaCR14nhMTEwFE96r",
      externalLink: "https://open.spotify.com/track/2YwrKRaCR14nhMTEwFE96r",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Be Still",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "bestill|6NWtt9pNOL2Gx7kBykdE5x|95653",
  song: "song/celtic-woman-be-still",
} as const satisfies Track
