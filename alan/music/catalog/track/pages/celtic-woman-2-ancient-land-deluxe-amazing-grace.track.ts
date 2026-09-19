import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeAmazingGrace = {
  id: "01a0abea-5b60-734f-95c0-19343a5f330c",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-amazing-grace",
  ownLength: 5.546666666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 25,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qBIEsPjsGmF5gkGMRUcnx",
      externalLink: "https://open.spotify.com/track/2qBIEsPjsGmF5gkGMRUcnx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Amazing Grace",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "amazinggrace|6NWtt9pNOL2Gx7kBykdE5x|332800",
  song: "song/celtic-woman-amazing-grace",
} as const satisfies Track
