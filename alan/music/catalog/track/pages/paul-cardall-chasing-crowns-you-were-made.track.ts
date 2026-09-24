import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsYouWereMade = {
  id: "01a0b4c8-22d4-70fb-a6d7-818b4f2bef0b",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-you-were-made",
  ownLength: 3.19375,
  ownProgress: 3.19375,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Were Made",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "youweremade|7FQRbf8gbKw8KZQZAJWxH2|191625",
  song: "song/paul-cardall-you-were-made",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 16,
      externalId: "58yRNKsc60QuW7xZcQqnmg",
      externalLink: "https://open.spotify.com/track/58yRNKsc60QuW7xZcQqnmg",
    },
  ],
} as const satisfies Track
