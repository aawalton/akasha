import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefMountainMinuet = {
  id: "01a0b4c8-253a-75b4-b151-47e80be46359",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-mountain-minuet",
  ownLength: 4.0867,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rZ6aWM8fHbt92NeWyckS7",
      externalLink: "https://open.spotify.com/track/3rZ6aWM8fHbt92NeWyckS7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mountain Minuet",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "mountainminuet|7FQRbf8gbKw8KZQZAJWxH2|245202",
} as const satisfies Track
