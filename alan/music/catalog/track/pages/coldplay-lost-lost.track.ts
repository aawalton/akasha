import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLost = {
  id: "01a0b9ee-fb29-79e7-9faa-bc3918a89410",
  type: "page-type/track",
  slug: "coldplay-lost-lost",
  ownLength: 3.91755,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-lost"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55Qm6iVvo1OMeoXc8elnmj",
      externalLink: "https://open.spotify.com/track/55Qm6iVvo1OMeoXc8elnmj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost!",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|235053",
  song: "song/coldplay-lost",
} as const satisfies Track
