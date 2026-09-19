import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoHope = {
  id: "01a0b4c8-47cc-7a64-a250-3597fddba15d",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-hope",
  ownLength: 3.2791,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07RZrBOLf6pnF7AF6cpdP2",
      externalLink: "https://open.spotify.com/track/07RZrBOLf6pnF7AF6cpdP2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hope",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|196746",
  song: "song/paul-cardall-hope",
} as const satisfies Track
