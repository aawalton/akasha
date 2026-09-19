import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoSweetEscape = {
  id: "01a0b4c8-475a-717d-892d-3f64765d6b1d",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-sweet-escape",
  ownLength: 3.14355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gyhq95o5WmoWjUeFkqkAV",
      externalLink: "https://open.spotify.com/track/4gyhq95o5WmoWjUeFkqkAV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Escape",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetescape|7FQRbf8gbKw8KZQZAJWxH2|188613",
  song: "song/paul-cardall-sweet-escape",
} as const satisfies Track
