import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsPassingTime = {
  id: "01a0b4c8-3cf4-75df-93f4-6cf35cd40619",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-passing-time",
  ownLength: 3.9771,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6duBqVrcQLJQ3o8ayXlQ5m",
      externalLink: "https://open.spotify.com/track/6duBqVrcQLJQ3o8ayXlQ5m",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Passing Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|238626",
  song: "song/paul-cardall-passing-time",
} as const satisfies Track
