import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinySiuilARun = {
  id: "01a0abea-6818-780c-a1c4-d5658593a94f",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-siuil-a-run",
  ownLength: 2.9976333333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1nGCEXgw8OGnXLNlNBHJj3",
      externalLink: "https://open.spotify.com/track/1nGCEXgw8OGnXLNlNBHJj3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Siúil a Rún",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "siuilarun|6NWtt9pNOL2Gx7kBykdE5x|179858",
  song: "song/celtic-woman-siuil-a-run",
} as const satisfies Track
