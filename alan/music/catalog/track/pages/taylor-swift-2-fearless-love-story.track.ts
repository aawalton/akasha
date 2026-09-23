import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessLoveStory = {
  id: "01a0ce86-8f63-79bd-995e-e84ffefda2c1",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-love-story",
  ownLength: 3.9211,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Love Story",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "lovestory|06HL4z0CvFAxyc27GXpf02|235266",
  song: "song/taylor-swift-love-story",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 3,
      externalId: "1vrd6UOGamcKNGnSHJQlSt",
      externalLink: "https://open.spotify.com/track/1vrd6UOGamcKNGnSHJQlSt",
    },
  ],
} as const satisfies Track
