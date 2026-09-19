import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleFirstSnow = {
  id: "01a0b4c8-2d26-79a9-8177-04a09805f4ee",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-first-snow",
  ownLength: 3.378216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FJIbfzjXECWES6eEhkHST",
      externalLink: "https://open.spotify.com/track/1FJIbfzjXECWES6eEhkHST",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "First Snow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "firstsnow|7FQRbf8gbKw8KZQZAJWxH2|202693",
  song: "song/paul-cardall-first-snow",
} as const satisfies Track
