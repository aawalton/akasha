import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandLongJourneyHome = {
  id: "01a0abea-5ce5-7007-b1a1-bdc41a31a7e5",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-long-journey-home",
  ownLength: 3.2226666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IP75UMiMSuGJgY2uj9H6s",
      externalLink: "https://open.spotify.com/track/4IP75UMiMSuGJgY2uj9H6s",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Long Journey Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "longjourneyhome|6NWtt9pNOL2Gx7kBykdE5x|193360",
  song: "song/celtic-woman-long-journey-home",
} as const satisfies Track
