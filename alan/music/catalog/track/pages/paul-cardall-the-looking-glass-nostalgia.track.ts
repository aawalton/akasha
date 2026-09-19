import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassNostalgia = {
  id: "01a0b4c8-61e4-7f0c-8aed-9413c26b0636",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-nostalgia",
  ownLength: 3.136233333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7DDIxsZf1cW8LGHg1RzHC7",
      externalLink: "https://open.spotify.com/track/7DDIxsZf1cW8LGHg1RzHC7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Nostalgia",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "nostalgia|7FQRbf8gbKw8KZQZAJWxH2|188174",
  song: "song/paul-cardall-nostalgia",
} as const satisfies Track
