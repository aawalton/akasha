import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverCruelSummer = {
  id: "01a0ce86-6dfa-719d-a542-85b39dd4dcad",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-cruel-summer",
  ownLength: 2.9737666666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Cruel Summer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "cruelsummer|06HL4z0CvFAxyc27GXpf02|178426",
  song: "song/taylor-swift-cruel-summer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 2,
      externalId: "1BxfuPKGuaTgP7aM0Bbdwr",
      externalLink: "https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr",
    },
  ],
} as const satisfies Track
