import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleANewYear = {
  id: "01a0b4c8-2e91-751d-a651-89e8df1b6ed0",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-a-new-year",
  ownLength: 2.7871,
  ownProgress: 2.7871,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  status: "completed",
  unit: "unit/minutes",
  title: "A New Year",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "anewyear|7FQRbf8gbKw8KZQZAJWxH2|167226",
  song: "song/paul-cardall-a-new-year",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 14,
      externalId: "2GftUnahn7GEETJskPfVj1",
      externalLink: "https://open.spotify.com/track/2GftUnahn7GEETJskPfVj1",
    },
  ],
} as const satisfies Track
