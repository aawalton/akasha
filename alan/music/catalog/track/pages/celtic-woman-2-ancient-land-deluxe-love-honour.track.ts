import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeLoveHonour = {
  id: "01a0abea-58f8-79ac-b109-e4db7efe4929",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-love-honour",
  ownLength: 4.074666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3x8bArT6Kt2J86FaZzgz27",
      externalLink: "https://open.spotify.com/track/3x8bArT6Kt2J86FaZzgz27",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Love & Honour",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "lovehonour|6NWtt9pNOL2Gx7kBykdE5x|244480",
  song: "song/celtic-woman-love-honour",
} as const satisfies Track
