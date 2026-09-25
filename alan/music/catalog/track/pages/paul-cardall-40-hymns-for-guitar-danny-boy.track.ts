import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarDannyBoy = {
  id: "01a0b4c8-1c4c-7656-85d6-ee50627eefad",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-danny-boy",
  ownLength: 2.753416666666667,
  ownProgress: 2.753416666666667,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danny Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "dannyboy|7FQRbf8gbKw8KZQZAJWxH2|165205",
  song: "song/paul-cardall-danny-boy",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 29,
      externalId: "4XaKGw5AFtVQ5nPRqCHcUl",
      externalLink: "https://open.spotify.com/track/4XaKGw5AFtVQ5nPRqCHcUl",
    },
  ],
} as const satisfies Track
