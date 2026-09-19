import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandLoveHonour = {
  id: "01a0abea-5c64-7abb-a424-56e57dac98df",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-love-honour",
  ownLength: 4.074666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3o8SJ8l6EbDyPFIbaXzE4D",
      externalLink: "https://open.spotify.com/track/3o8SJ8l6EbDyPFIbaXzE4D",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Love & Honour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "lovehonour|6NWtt9pNOL2Gx7kBykdE5x|244480",
  song: "song/celtic-woman-love-honour",
} as const satisfies Track
