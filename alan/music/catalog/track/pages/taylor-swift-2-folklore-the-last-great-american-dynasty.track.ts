import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreTheLastGreatAmericanDynasty = {
  id: "01a0ce86-6b7b-787a-a9e6-c4cd4881c76b",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-the-last-great-american-dynasty",
  ownLength: 3.8499833333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "not-started",
  unit: "unit/minutes",
  title: "the last great american dynasty",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thelastgreatamericandynasty|06HL4z0CvFAxyc27GXpf02|230999",
  song: "song/taylor-swift-the-last-great-american-dynasty",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 3,
      externalId: "2Eeur20xVqfUoM3Q7EFPFt",
      externalLink: "https://open.spotify.com/track/2Eeur20xVqfUoM3Q7EFPFt",
    },
  ],
} as const satisfies Track
