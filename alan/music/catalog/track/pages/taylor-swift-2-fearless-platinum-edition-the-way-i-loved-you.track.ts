import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionTheWayILovedYou = {
  id: "01a0ce86-9378-78cf-93d6-6b729fc8f663",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-the-way-i-loved-you",
  ownLength: 4.070666666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Way I Loved You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thewayilovedyou|06HL4z0CvFAxyc27GXpf02|244240",
  song: "song/taylor-swift-the-way-i-loved-you",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 16,
      externalId: "77VotUUL79U10TAnYdqwvr",
      externalLink: "https://open.spotify.com/track/77VotUUL79U10TAnYdqwvr",
    },
  ],
} as const satisfies Track
