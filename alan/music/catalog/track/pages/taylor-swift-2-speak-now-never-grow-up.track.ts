import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowNeverGrowUp = {
  id: "01a0ce86-8a90-7c51-82c5-dabb21562348",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-never-grow-up",
  ownLength: 4.8411,
  ownProgress: 4.8411,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Grow Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "nevergrowup|06HL4z0CvFAxyc27GXpf02|290466",
  song: "song/taylor-swift-never-grow-up",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 8,
      externalId: "1wJL1A0QUHJPf2cm7tsrdw",
      externalLink: "https://open.spotify.com/track/1wJL1A0QUHJPf2cm7tsrdw",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 8,
      externalId: "74WBGgUnpKrJXt6TETfR6Z",
      externalLink: "https://open.spotify.com/track/74WBGgUnpKrJXt6TETfR6Z",
    },
  ],
} as const satisfies Track
