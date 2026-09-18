import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoTheRelease = {
  id: "01a0b4c8-4894-7405-bc51-7c7d6d39de58",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-the-release",
  ownLength: 3.4093333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2AfUXX1A5KGscwlp9J8Fhs",
      externalLink: "https://open.spotify.com/track/2AfUXX1A5KGscwlp9J8Fhs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Release",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|204560",
} as const satisfies Track
