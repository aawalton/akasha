import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionYoureNotSorry = {
  id: "01a0ce86-9350-75f8-9d66-35e92d4500e2",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-youre-not-sorry",
  ownLength: 4.363333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "You're Not Sorry",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "yourenotsorry|06HL4z0CvFAxyc27GXpf02|261800",
  song: "song/taylor-swift-you-re-not-sorry",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 15,
      externalId: "6HWYtS215rxaaMjvpyG18W",
      externalLink: "https://open.spotify.com/track/6HWYtS215rxaaMjvpyG18W",
    },
  ],
} as const satisfies Track
