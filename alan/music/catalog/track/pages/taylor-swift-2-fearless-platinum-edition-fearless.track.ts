import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionFearless = {
  id: "01a0ce86-920e-7718-be49-927308700959",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-fearless",
  ownLength: 4.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Fearless",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "fearless|06HL4z0CvFAxyc27GXpf02|242000",
  song: "song/taylor-swift-fearless",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 7,
      externalId: "3F6czr26ZwGU5O5CHY04Ma",
      externalLink: "https://open.spotify.com/track/3F6czr26ZwGU5O5CHY04Ma",
    },
  ],
} as const satisfies Track
