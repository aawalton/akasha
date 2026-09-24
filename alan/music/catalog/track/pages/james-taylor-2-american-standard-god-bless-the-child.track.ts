import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardGodBlessTheChild = {
  id: "01a0abeb-2f11-7028-8a82-6bf75d0b305c",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-god-bless-the-child",
  ownLength: 3.3626666666666667,
  ownProgress: 3.3626666666666667,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "God Bless The Child",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "godblessthechild|0vn7UBvSQECKJm2817Yf1P|201760",
  song: "song/james-taylor-god-bless-the-child",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 9,
      externalId: "16eQQlzeHu2jVnopa59P2B",
      externalLink: "https://open.spotify.com/track/16eQQlzeHu2jVnopa59P2B",
    },
  ],
} as const satisfies Track
