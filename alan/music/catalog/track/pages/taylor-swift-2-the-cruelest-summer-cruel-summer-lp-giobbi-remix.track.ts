import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheCruelestSummerCruelSummerLpGiobbiRemix = {
  id: "01a0ce86-9b0c-7dfc-86eb-a9ef9326216f",
  type: "page-type/track",
  slug: "taylor-swift-2-the-cruelest-summer-cruel-summer-lp-giobbi-remix",
  ownLength: 3.215,
  ownProgress: 3.215,
  partOfCollections: ["release/taylor-swift-2-the-cruelest-summer"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cruel Summer - LP Giobbi Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "3oKnyRhYWzNsTiss5n4Z1J", artistName: "LP Giobbi" },
  ],
  trackKey: "cruelsummerlpgiobbiremix|06HL4z0CvFAxyc27GXpf02,3oKnyRhYWzNsTiss5n4Z1J|192900",
  song: "song/taylor-swift-cruel-summer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-cruelest-summer",
      discNumber: 1,
      position: 2,
      externalId: "37jfioVu3Bd2Du9bteXNDU",
      externalLink: "https://open.spotify.com/track/37jfioVu3Bd2Du9bteXNDU",
    },
  ],
} as const satisfies Track
