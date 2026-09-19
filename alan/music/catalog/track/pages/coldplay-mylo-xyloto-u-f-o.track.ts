import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUFO = {
  id: "01a0b9ee-dd51-73a8-97de-09206dcb3877",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-u-f-o",
  ownLength: 2.2969833333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BbIybrP84Tp99DLJg1cq3",
      externalLink: "https://open.spotify.com/track/6BbIybrP84Tp99DLJg1cq3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "U.F.O.",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "ufo|4gzpq5DPGxSnKTe4SA8HAU|137819",
  song: "song/coldplay-u-f-o",
} as const satisfies Track
