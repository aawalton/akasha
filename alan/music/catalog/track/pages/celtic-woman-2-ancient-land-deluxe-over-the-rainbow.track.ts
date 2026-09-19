import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeOverTheRainbow = {
  id: "01a0abea-5b20-7b61-9955-54550865e0b3",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-over-the-rainbow",
  ownLength: 3.4053333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 23,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52uWFLwaEzpWBhLT5BWIKv",
      externalLink: "https://open.spotify.com/track/52uWFLwaEzpWBhLT5BWIKv",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Over The Rainbow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|204320",
  song: "song/celtic-woman-over-the-rainbow",
} as const satisfies Track
