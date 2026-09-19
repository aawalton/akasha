import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleNewMoonRising = {
  id: "01a0b4c8-2d04-78eb-bbeb-82bc16f4b1df",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-new-moon-rising",
  ownLength: 3.62155,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1q07To1TuNfMYxVfFPW7TV",
      externalLink: "https://open.spotify.com/track/1q07To1TuNfMYxVfFPW7TV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "New Moon Rising",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "newmoonrising|7FQRbf8gbKw8KZQZAJWxH2|217293",
  song: "song/paul-cardall-new-moon-rising",
} as const satisfies Track
