import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoUnseenWorld = {
  id: "01a0b4c8-46c7-7620-9747-1755ef04c269",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-unseen-world",
  ownLength: 6.523333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FNBOe4NKxqcJPFQ4YhGor",
      externalLink: "https://open.spotify.com/track/6FNBOe4NKxqcJPFQ4YhGor",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Unseen World",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "unseenworld|7FQRbf8gbKw8KZQZAJWxH2|391400",
  song: "song/paul-cardall-unseen-world",
} as const satisfies Track
