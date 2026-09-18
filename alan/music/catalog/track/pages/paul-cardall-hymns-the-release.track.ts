import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsTheRelease = {
  id: "01a0b4c8-6352-7c8f-9327-e4e2feeddc94",
  type: "page-type/track",
  slug: "paul-cardall-hymns-the-release",
  ownLength: 3.3924333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49IeMe9gQ6LBxTwiq88Q3s",
      externalLink: "https://open.spotify.com/track/49IeMe9gQ6LBxTwiq88Q3s",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Release",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|203546",
} as const satisfies Track
