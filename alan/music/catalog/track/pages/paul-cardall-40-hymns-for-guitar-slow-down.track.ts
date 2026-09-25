import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarSlowDown = {
  id: "01a0b4c8-1d07-7bf7-9da2-dee80654782b",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-slow-down",
  ownLength: 2.0252333333333334,
  ownProgress: 2.0252333333333334,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "Slow Down",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "slowdown|7FQRbf8gbKw8KZQZAJWxH2|121514",
  song: "song/paul-cardall-slow-down",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 34,
      externalId: "0xymtjLptn73r0GkPdJWzc",
      externalLink: "https://open.spotify.com/track/0xymtjLptn73r0GkPdJWzc",
    },
  ],
} as const satisfies Track
