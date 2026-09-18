import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoTime = {
  id: "01a0b4c8-4846-7041-a5d5-7c9434f25f19",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-time",
  ownLength: 3.1671,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QcBhrWGLb13aawq9JqduL",
      externalLink: "https://open.spotify.com/track/4QcBhrWGLb13aawq9JqduL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "time|7FQRbf8gbKw8KZQZAJWxH2|190026",
} as const satisfies Track
