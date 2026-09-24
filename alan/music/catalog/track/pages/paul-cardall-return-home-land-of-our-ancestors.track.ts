import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeLandOfOurAncestors = {
  id: "01a0b4c8-2995-7864-9799-b37489b21552",
  type: "page-type/track",
  slug: "paul-cardall-return-home-land-of-our-ancestors",
  ownLength: 3.2319,
  ownProgress: 3.2319,
  partOfCollections: ["release/paul-cardall-return-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Land of Our Ancestors",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "landofourancestors|7FQRbf8gbKw8KZQZAJWxH2|193914",
  song: "song/paul-cardall-land-of-our-ancestors",
  carriedBy: [
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 9,
      externalId: "1hd4bCb8YIGuCNQk66c9mZ",
      externalLink: "https://open.spotify.com/track/1hd4bCb8YIGuCNQk66c9mZ",
    },
  ],
} as const satisfies Track
