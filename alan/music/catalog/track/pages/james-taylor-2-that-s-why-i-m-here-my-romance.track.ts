import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereMyRomance = {
  id: "01a0abeb-424c-707e-87b5-50ffe28546ad",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-my-romance",
  ownLength: 2.77155,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ux5jhMGkZfmApSNddgLxF",
      externalLink: "https://open.spotify.com/track/0ux5jhMGkZfmApSNddgLxF",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Romance",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "myromance|0vn7UBvSQECKJm2817Yf1P|166293",
  song: "song/james-taylor-my-romance",
} as const satisfies Track
