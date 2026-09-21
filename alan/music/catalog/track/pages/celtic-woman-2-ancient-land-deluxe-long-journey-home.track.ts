import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeLongJourneyHome = {
  id: "01a0abea-5979-727c-8942-6f53c1a1319a",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-long-journey-home",
  ownLength: 3.2226666666666666,
  ownProgress: 3.2226666666666666,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Q3OPCz5bgrglX6I77LMff",
      externalLink: "https://open.spotify.com/track/3Q3OPCz5bgrglX6I77LMff",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Long Journey Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "longjourneyhome|6NWtt9pNOL2Gx7kBykdE5x|193360",
  song: "song/celtic-woman-long-journey-home",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 10,
      externalId: "4IP75UMiMSuGJgY2uj9H6s",
      externalLink: "https://open.spotify.com/track/4IP75UMiMSuGJgY2uj9H6s",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "3Q3OPCz5bgrglX6I77LMff",
      externalLink: "https://open.spotify.com/track/3Q3OPCz5bgrglX6I77LMff",
    },
  ],
} as const satisfies Track
