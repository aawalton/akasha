import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarTheLordsPrayer = {
  id: "01a0b4c8-1b9d-7173-bf17-38fc6bd0c43f",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-the-lords-prayer",
  ownLength: 3.0736,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Lord's Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thelordsprayer|7FQRbf8gbKw8KZQZAJWxH2|184416",
  song: "song/paul-cardall-the-lords-prayer",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 24,
      externalId: "6L0qypNnRoRFv54HjvZOsS",
      externalLink: "https://open.spotify.com/track/6L0qypNnRoRFv54HjvZOsS",
    },
  ],
} as const satisfies Track
