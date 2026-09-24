import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenHope = {
  id: "01a0b4c8-4a6b-7cc9-a920-656ee230d28b",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-hope",
  ownLength: 3.260666666666667,
  ownProgress: 3.260666666666667,
  partOfCollections: [
    "release/paul-cardall-living-for-eden",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Hope",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|195640",
  song: "song/paul-cardall-hope",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 10,
      externalId: "4g9dYMtOJf384x3z3JCzwp",
      externalLink: "https://open.spotify.com/track/4g9dYMtOJf384x3z3JCzwp",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 14,
      externalId: "1jZaCZr2wqPZVUHTmgJFNn",
      externalLink: "https://open.spotify.com/track/1jZaCZr2wqPZVUHTmgJFNn",
    },
  ],
} as const satisfies Track
