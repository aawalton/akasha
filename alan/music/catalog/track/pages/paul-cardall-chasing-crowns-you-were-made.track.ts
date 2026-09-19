import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsYouWereMade = {
  id: "01a0b4c8-22d4-70fb-a6d7-818b4f2bef0b",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-you-were-made",
  ownLength: 3.19375,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58yRNKsc60QuW7xZcQqnmg",
      externalLink: "https://open.spotify.com/track/58yRNKsc60QuW7xZcQqnmg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "You Were Made",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "youweremade|7FQRbf8gbKw8KZQZAJWxH2|191625",
  song: "song/paul-cardall-you-were-made",
} as const satisfies Track
