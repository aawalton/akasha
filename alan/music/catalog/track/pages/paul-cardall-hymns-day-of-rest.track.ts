import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsDayOfRest = {
  id: "01a0b4c8-63cf-7020-8df9-f593bd8dccb8",
  type: "page-type/track",
  slug: "paul-cardall-hymns-day-of-rest",
  ownLength: 2.624433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49Sb1o9kyyJLrfaXCzq2jX",
      externalLink: "https://open.spotify.com/track/49Sb1o9kyyJLrfaXCzq2jX",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Day Of Rest",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "dayofrest|7FQRbf8gbKw8KZQZAJWxH2|157466",
  song: "song/paul-cardall-day-of-rest",
} as const satisfies Track
