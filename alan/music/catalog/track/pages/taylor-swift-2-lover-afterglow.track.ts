import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverAfterglow = {
  id: "01a0ce86-7016-7fb5-a58c-8d9439a9533e",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-afterglow",
  ownLength: 3.72155,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Afterglow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "afterglow|06HL4z0CvFAxyc27GXpf02|223293",
  song: "song/taylor-swift-afterglow",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 15,
      externalId: "1SymEzIT3H8UZfibCs3TYi",
      externalLink: "https://open.spotify.com/track/1SymEzIT3H8UZfibCs3TYi",
    },
  ],
} as const satisfies Track
