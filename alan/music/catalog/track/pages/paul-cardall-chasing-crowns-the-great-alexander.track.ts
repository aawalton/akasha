import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsTheGreatAlexander = {
  id: "01a0b4c8-214c-7f28-b78c-b70f0f9a17bb",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-the-great-alexander",
  ownLength: 3.3041666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5FaANEG8jIuo7aoGumJWFP",
      externalLink: "https://open.spotify.com/track/5FaANEG8jIuo7aoGumJWFP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Great Alexander",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thegreatalexander|7FQRbf8gbKw8KZQZAJWxH2|198250",
  song: "song/paul-cardall-the-great-alexander",
} as const satisfies Track
