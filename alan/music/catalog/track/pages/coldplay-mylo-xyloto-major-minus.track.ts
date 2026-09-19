import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoMajorMinus = {
  id: "01a0b9ee-dd25-7e61-badc-10213fe60c50",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-major-minus",
  ownLength: 3.5054,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6maXBs9zUY48m1UNHgTeRC",
      externalLink: "https://open.spotify.com/track/6maXBs9zUY48m1UNHgTeRC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Major Minus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "majorminus|4gzpq5DPGxSnKTe4SA8HAU|210324",
  song: "song/coldplay-major-minus",
} as const satisfies Track
