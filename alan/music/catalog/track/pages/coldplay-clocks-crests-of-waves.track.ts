import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayClocksCrestsOfWaves = {
  id: "01a0b9ef-0117-7a37-a245-479128fbdc68",
  type: "page-type/track",
  slug: "coldplay-clocks-crests-of-waves",
  ownLength: 3.6637666666666666,
  ownProgress: 3.6637666666666666,
  partOfCollections: ["release/coldplay-clocks"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZMqdwtZvvNrpUUTijZem6",
      externalLink: "https://open.spotify.com/track/5ZMqdwtZvvNrpUUTijZem6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crests of Waves",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "crestsofwaves|4gzpq5DPGxSnKTe4SA8HAU|219826",
  song: "song/coldplay-crests-of-waves",
  carriedBy: [
    {
      release: "release/coldplay-clocks",
      discNumber: 1,
      position: 2,
      externalId: "5ZMqdwtZvvNrpUUTijZem6",
      externalLink: "https://open.spotify.com/track/5ZMqdwtZvvNrpUUTijZem6",
    },
  ],
} as const satisfies Track
