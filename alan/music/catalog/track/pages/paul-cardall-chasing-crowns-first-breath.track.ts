import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsFirstBreath = {
  id: "01a0b4c8-21ee-73e9-a6da-9fc35930b5db",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-first-breath",
  ownLength: 3.9583333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03he3cZdJIwDxSYZh4VewB",
      externalLink: "https://open.spotify.com/track/03he3cZdJIwDxSYZh4VewB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "First Breath",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "firstbreath|7FQRbf8gbKw8KZQZAJWxH2|237500",
  song: "song/paul-cardall-first-breath",
} as const satisfies Track
