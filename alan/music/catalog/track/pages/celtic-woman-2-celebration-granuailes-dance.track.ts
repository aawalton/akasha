import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationGranuailesDance = {
  id: "01a0abea-5547-7080-a6c3-29b67f83b52b",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-granuailes-dance",
  ownLength: 3.7302166666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rJnpg9uBvRxoCuzlPTTST",
      externalLink: "https://open.spotify.com/track/1rJnpg9uBvRxoCuzlPTTST",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Granuaile's Dance",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "granuailesdance|6NWtt9pNOL2Gx7kBykdE5x|223813",
  song: "song/celtic-woman-granuailes-dance",
} as const satisfies Track
