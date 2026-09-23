import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionYouBelongWithMe = {
  id: "01a0ce86-92d6-784b-871d-99a23eb0da4d",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-you-belong-with-me",
  ownLength: 3.8524333333333334,
  ownProgress: 3.8524333333333334,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Belong With Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "youbelongwithme|06HL4z0CvFAxyc27GXpf02|231146",
  song: "song/taylor-swift-you-belong-with-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 12,
      externalId: "3as6Wz3mwbTnusWhZjTUNr",
      externalLink: "https://open.spotify.com/track/3as6Wz3mwbTnusWhZjTUNr",
    },
  ],
} as const satisfies Track
