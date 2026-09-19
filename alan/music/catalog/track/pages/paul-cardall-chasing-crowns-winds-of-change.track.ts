import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsWindsOfChange = {
  id: "01a0b4c8-219f-7fb7-9dd3-45bcc9fd3a47",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-winds-of-change",
  ownLength: 3.6041666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78QcjBxEiLVY3FqcY82Exp",
      externalLink: "https://open.spotify.com/track/78QcjBxEiLVY3FqcY82Exp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Winds of Change",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "windsofchange|7FQRbf8gbKw8KZQZAJWxH2|216250",
  song: "song/paul-cardall-winds-of-change",
} as const satisfies Track
