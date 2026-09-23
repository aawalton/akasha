import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionComeInWithTheRain = {
  id: "01a0ce86-9193-77ba-adbd-6490638bf27c",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-come-in-with-the-rain",
  ownLength: 3.9684333333333335,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Come In With The Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "comeinwiththerain|06HL4z0CvFAxyc27GXpf02|238106",
  song: "song/taylor-swift-come-in-with-the-rain",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 4,
      externalId: "4pl5zcqCv4vc3cB7M4MZ6f",
      externalLink: "https://open.spotify.com/track/4pl5zcqCv4vc3cB7M4MZ6f",
    },
  ],
} as const satisfies Track
