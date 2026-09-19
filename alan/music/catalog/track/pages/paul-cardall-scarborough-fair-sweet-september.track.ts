import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairSweetSeptember = {
  id: "01a0b4c8-6ba0-7dee-a3bb-ce5433395fe1",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-sweet-september",
  ownLength: 3.0182166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bvkc7Jha4yYKzU6o9NUqp",
      externalLink: "https://open.spotify.com/track/2bvkc7Jha4yYKzU6o9NUqp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet September",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetseptember|7FQRbf8gbKw8KZQZAJWxH2|181093",
  song: "song/paul-cardall-sweet-september",
} as const satisfies Track
