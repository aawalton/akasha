import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsHolyMother = {
  id: "01a0b4c8-2215-773c-a344-cbeb8dc6117f",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-holy-mother",
  ownLength: 3.044,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dDKGfHm1bePhGD5F2tbh3",
      externalLink: "https://open.spotify.com/track/6dDKGfHm1bePhGD5F2tbh3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Holy Mother",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "holymother|7FQRbf8gbKw8KZQZAJWxH2|182640",
} as const satisfies Track
