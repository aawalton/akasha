import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeLoveHonour = {
  id: "01a0abea-58f8-79ac-b109-e4db7efe4929",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-love-honour",
  ownLength: 4.074666666666666,
  ownProgress: 4.074666666666666,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  position: 6,
  status: "completed",
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
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 6,
      externalId: "3o8SJ8l6EbDyPFIbaXzE4D",
      externalLink: "https://open.spotify.com/track/3o8SJ8l6EbDyPFIbaXzE4D",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "3x8bArT6Kt2J86FaZzgz27",
      externalLink: "https://open.spotify.com/track/3x8bArT6Kt2J86FaZzgz27",
    },
  ],
} as const satisfies Track
