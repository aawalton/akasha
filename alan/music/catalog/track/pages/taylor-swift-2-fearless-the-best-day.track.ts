import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessTheBestDay = {
  id: "01a0ce86-90c8-7cd0-b6df-36a3fd952062",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-the-best-day",
  ownLength: 4.088883333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Best Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thebestday|06HL4z0CvFAxyc27GXpf02|245333",
  song: "song/taylor-swift-the-best-day",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 12,
      externalId: "3esA216TyLHEkNiBCeCmcg",
      externalLink: "https://open.spotify.com/track/3esA216TyLHEkNiBCeCmcg",
    },
  ],
} as const satisfies Track
