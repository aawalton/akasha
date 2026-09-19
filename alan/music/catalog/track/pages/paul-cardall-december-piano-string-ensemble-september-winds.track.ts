import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleSeptemberWinds = {
  id: "01a0b4c8-2cc2-7b93-9334-93990bf8d827",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-september-winds",
  ownLength: 3.8077666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jhoxfCTGqDiLZtISaaPob",
      externalLink: "https://open.spotify.com/track/2jhoxfCTGqDiLZtISaaPob",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "September Winds",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "septemberwinds|7FQRbf8gbKw8KZQZAJWxH2|228466",
  song: "song/paul-cardall-september-winds",
} as const satisfies Track
