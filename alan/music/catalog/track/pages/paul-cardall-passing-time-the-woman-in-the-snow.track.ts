import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeTheWomanInTheSnow = {
  id: "01a0b4c8-6c61-74c3-b6e1-f292910f8147",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-the-woman-in-the-snow",
  ownLength: 3.71895,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-passing-time"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05pIB1M8VNrVW8rUZroN6B",
      externalLink: "https://open.spotify.com/track/05pIB1M8VNrVW8rUZroN6B",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Woman in the Snow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thewomaninthesnow|7FQRbf8gbKw8KZQZAJWxH2|223137",
  song: "song/paul-cardall-the-woman-in-the-snow",
} as const satisfies Track
