import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHomewardBound = {
  id: "01a0b4c8-189f-7fe4-b434-e5c4d8ff0663",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-homeward-bound",
  ownLength: 3.75,
  ownProgress: 3.75,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "Homeward Bound",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "homewardbound|7FQRbf8gbKw8KZQZAJWxH2|225000",
  song: "song/paul-cardall-homeward-bound",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 2,
      externalId: "5vvqLOzysbbeAWgVoTHZwl",
      externalLink: "https://open.spotify.com/track/5vvqLOzysbbeAWgVoTHZwl",
    },
  ],
} as const satisfies Track
