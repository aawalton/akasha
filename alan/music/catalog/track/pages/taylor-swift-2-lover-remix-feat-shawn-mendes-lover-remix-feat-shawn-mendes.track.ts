import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverRemixFeatShawnMendesLoverRemixFeatShawnMendes = {
  id: "01a0ce86-a7e5-737f-aff3-3c77cdb1e5b7",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-remix-feat-shawn-mendes-lover-remix-feat-shawn-mendes",
  ownLength: 3.6884333333333332,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover-remix-feat-shawn-mendes"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lover (Remix) [feat. Shawn Mendes]",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "7n2wHs1TKAczGzO7Dd2rGr", artistName: "Shawn Mendes" },
  ],
  trackKey: "loverremixfeatshawnmendes|06HL4z0CvFAxyc27GXpf02,7n2wHs1TKAczGzO7Dd2rGr|221306",
  song: "song/taylor-swift-lover",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover-remix-feat-shawn-mendes",
      discNumber: 1,
      position: 1,
      externalId: "3i9UVldZOE0aD0JnyfAZZ0",
      externalLink: "https://open.spotify.com/track/3i9UVldZOE0aD0JnyfAZZ0",
    },
  ],
} as const satisfies Track
