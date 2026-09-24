import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleThanksgiving = {
  id: "01a0b4c8-2d6e-752d-b602-8f6690095aa6",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-thanksgiving",
  ownLength: 2.35955,
  ownProgress: 2.35955,
  partOfCollections: [
    "release/paul-cardall-december-piano-string-ensemble",
    "release/paul-cardall-thanksgiving",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Thanksgiving",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thanksgiving|7FQRbf8gbKw8KZQZAJWxH2|141573",
  song: "song/paul-cardall-thanksgiving",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 6,
      externalId: "4j4mk3j6IgNaEWodidrfle",
      externalLink: "https://open.spotify.com/track/4j4mk3j6IgNaEWodidrfle",
    },
    {
      release: "release/paul-cardall-thanksgiving",
      discNumber: 1,
      position: 1,
      externalId: "5XYHovggqmPIZsDzp9FT9F",
      externalLink: "https://open.spotify.com/track/5XYHovggqmPIZsDzp9FT9F",
    },
  ],
} as const satisfies Track
