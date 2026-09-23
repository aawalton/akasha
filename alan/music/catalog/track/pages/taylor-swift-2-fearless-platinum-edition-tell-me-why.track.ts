import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionTellMeWhy = {
  id: "01a0ce86-9328-7fc3-846c-1d2a90034e0f",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-tell-me-why",
  ownLength: 3.3426666666666667,
  ownProgress: 3.3426666666666667,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tell Me Why",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "tellmewhy|06HL4z0CvFAxyc27GXpf02|200560",
  song: "song/taylor-swift-tell-me-why",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 14,
      externalId: "4XrP7vKBjKLEYlRZdb0Ygr",
      externalLink: "https://open.spotify.com/track/4XrP7vKBjKLEYlRZdb0Ygr",
    },
  ],
} as const satisfies Track
