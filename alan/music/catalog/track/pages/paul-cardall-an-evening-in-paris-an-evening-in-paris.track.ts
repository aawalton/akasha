import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAnEveningInParisAnEveningInParis = {
  id: "01a0b4c8-693b-7c92-b89c-97e9642c92ab",
  type: "page-type/track",
  slug: "paul-cardall-an-evening-in-paris-an-evening-in-paris",
  ownLength: 5.135633333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-an-evening-in-paris"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7l5nLeotZ90aJRlje3zKqp",
      externalLink: "https://open.spotify.com/track/7l5nLeotZ90aJRlje3zKqp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "An Evening In Paris",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aneveninginparis|7FQRbf8gbKw8KZQZAJWxH2|308138",
  song: "song/paul-cardall-an-evening-in-paris",
} as const satisfies Track
