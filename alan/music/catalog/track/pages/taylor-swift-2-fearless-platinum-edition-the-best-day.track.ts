import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionTheBestDay = {
  id: "01a0ce86-93c6-7285-93f1-968a6e6c4b05",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-the-best-day",
  ownLength: 4.0891,
  ownProgress: 4.0891,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Best Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thebestday|06HL4z0CvFAxyc27GXpf02|245346",
  song: "song/taylor-swift-the-best-day",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 18,
      externalId: "5YbZZ2gYfvW1UvHHF4pVaD",
      externalLink: "https://open.spotify.com/track/5YbZZ2gYfvW1UvHHF4pVaD",
    },
  ],
} as const satisfies Track
