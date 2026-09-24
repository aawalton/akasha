import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleSeptemberWinds = {
  id: "01a0b4c8-2cc2-7b93-9334-93990bf8d827",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-september-winds",
  ownLength: 3.8077666666666667,
  ownProgress: 3.8077666666666667,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  status: "completed",
  unit: "unit/minutes",
  title: "September Winds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "septemberwinds|7FQRbf8gbKw8KZQZAJWxH2|228466",
  song: "song/paul-cardall-september-winds",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 1,
      externalId: "2jhoxfCTGqDiLZtISaaPob",
      externalLink: "https://open.spotify.com/track/2jhoxfCTGqDiLZtISaaPob",
    },
  ],
} as const satisfies Track
