import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowTheStoryOfUs = {
  id: "01a0ce86-8a66-7ae9-b78f-2d0a3460bd42",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-the-story-of-us",
  ownLength: 4.427766666666667,
  ownProgress: 4.427766666666667,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Story Of Us",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "thestoryofus|06HL4z0CvFAxyc27GXpf02|265666",
  song: "song/taylor-swift-the-story-of-us",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 7,
      externalId: "3RBluWmSoG2pGA1OePzGJI",
      externalLink: "https://open.spotify.com/track/3RBluWmSoG2pGA1OePzGJI",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 7,
      externalId: "19tHCfzUSoy5HkpxcmbA0A",
      externalLink: "https://open.spotify.com/track/19tHCfzUSoy5HkpxcmbA0A",
    },
  ],
} as const satisfies Track
