import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBaptism = {
  id: "01a0b4c8-5592-7af4-993c-1358d9e32abf",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-baptism",
  ownLength: 3.67355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3OrEC0ZOxqN2WhG7Pr5DPz",
      externalLink: "https://open.spotify.com/track/3OrEC0ZOxqN2WhG7Pr5DPz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Baptism",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "baptism|7FQRbf8gbKw8KZQZAJWxH2|220413",
} as const satisfies Track
