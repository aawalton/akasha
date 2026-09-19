import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsHope = {
  id: "01a0b4c8-3e83-7cff-a4d5-816a2cb72cd9",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-hope",
  ownLength: 3.260666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1jZaCZr2wqPZVUHTmgJFNn",
      externalLink: "https://open.spotify.com/track/1jZaCZr2wqPZVUHTmgJFNn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hope",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|195640",
  song: "song/paul-cardall-hope",
} as const satisfies Track
