import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsSweetEscape = {
  id: "01a0b4c8-3e62-7360-ac4d-8677f3eed0e9",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-sweet-escape",
  ownLength: 3.121766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "60jdNWc0ggiZkHq14OErIf",
      externalLink: "https://open.spotify.com/track/60jdNWc0ggiZkHq14OErIf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Escape",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetescape|7FQRbf8gbKw8KZQZAJWxH2|187306",
  song: "song/paul-cardall-sweet-escape",
} as const satisfies Track
