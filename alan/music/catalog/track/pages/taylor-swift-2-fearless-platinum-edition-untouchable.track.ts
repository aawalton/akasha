import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionUntouchable = {
  id: "01a0ce86-9140-75d4-9dbb-552385a2736f",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-untouchable",
  ownLength: 5.184,
  ownProgress: 5.184,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Untouchable",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "untouchable|06HL4z0CvFAxyc27GXpf02|311040",
  song: "song/taylor-swift-untouchable",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 2,
      externalId: "2IZ00ed83ygPIiacYScWUE",
      externalLink: "https://open.spotify.com/track/2IZ00ed83ygPIiacYScWUE",
    },
  ],
} as const satisfies Track
