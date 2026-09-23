import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessWhiteHorse = {
  id: "01a0ce86-8fb2-7eaa-9800-3700cb56415d",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-white-horse",
  ownLength: 3.9071,
  ownProgress: 3.9071,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "White Horse",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "whitehorse|06HL4z0CvFAxyc27GXpf02|234426",
  song: "song/taylor-swift-white-horse",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 5,
      externalId: "6wn61Fzx9XMxQmieLpoIhW",
      externalLink: "https://open.spotify.com/track/6wn61Fzx9XMxQmieLpoIhW",
    },
  ],
} as const satisfies Track
