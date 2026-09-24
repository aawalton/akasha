import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsJosephSmithsFirstPrayer = {
  id: "01a0b4c8-6235-7230-b59c-6ad0fbb7d4b2",
  type: "page-type/track",
  slug: "paul-cardall-hymns-joseph-smiths-first-prayer",
  ownLength: 3.3191,
  ownProgress: 3.3191,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Joseph Smith's First Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "josephsmithsfirstprayer|7FQRbf8gbKw8KZQZAJWxH2|199146",
  song: "song/paul-cardall-joseph-smiths-first-prayer",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 1,
      externalId: "3Cji0LZjLdNeFdz8HXxR3d",
      externalLink: "https://open.spotify.com/track/3Cji0LZjLdNeFdz8HXxR3d",
    },
  ],
} as const satisfies Track
