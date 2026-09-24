import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHowGreatThouArt = {
  id: "01a0b4c8-19a3-7b9e-be38-c895340bf8d0",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-how-great-thou-art",
  ownLength: 3.285416666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "How Great Thou Art",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "howgreatthouart|7FQRbf8gbKw8KZQZAJWxH2|197125",
  song: "song/paul-cardall-how-great-thou-art",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 9,
      externalId: "5GJZSvkxqxpjoXD5WXserT",
      externalLink: "https://open.spotify.com/track/5GJZSvkxqxpjoXD5WXserT",
    },
  ],
} as const satisfies Track
