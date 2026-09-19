import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsChasingCrowns = {
  id: "01a0b4c8-20b5-7b0a-8f4d-dd959e210376",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-chasing-crowns",
  ownLength: 3.6473333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ErFPbzT5G1pBjaJr5FV7c",
      externalLink: "https://open.spotify.com/track/1ErFPbzT5G1pBjaJr5FV7c",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Chasing Crowns",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "chasingcrowns|7FQRbf8gbKw8KZQZAJWxH2|218840",
  song: "song/paul-cardall-chasing-crowns",
} as const satisfies Track
