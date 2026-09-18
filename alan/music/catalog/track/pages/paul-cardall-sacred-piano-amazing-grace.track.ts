import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoAmazingGrace = {
  id: "01a0b4c8-481b-7f78-8e65-b40bddc460ee",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-amazing-grace",
  ownLength: 4.278216666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LIA0gUVq1m1B6JWoHwxnx",
      externalLink: "https://open.spotify.com/track/2LIA0gUVq1m1B6JWoHwxnx",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Amazing Grace",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "amazinggrace|7FQRbf8gbKw8KZQZAJWxH2|256693",
} as const satisfies Track
