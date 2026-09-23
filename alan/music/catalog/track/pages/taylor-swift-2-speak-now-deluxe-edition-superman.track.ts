import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEditionSuperman = {
  id: "01a0ce86-8bfe-73a3-8ba5-64397e014d3c",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-deluxe-edition-superman",
  ownLength: 4.599333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-speak-now-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Superman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "superman|06HL4z0CvFAxyc27GXpf02|275960",
  song: "song/taylor-swift-superman",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 17,
      externalId: "2R7C9dDqv1UPycvepBFziA",
      externalLink: "https://open.spotify.com/track/2R7C9dDqv1UPycvepBFziA",
    },
  ],
} as const satisfies Track
