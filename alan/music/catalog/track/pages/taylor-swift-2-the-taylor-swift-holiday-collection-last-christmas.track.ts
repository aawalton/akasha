import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTaylorSwiftHolidayCollectionLastChristmas = {
  id: "01a0ce86-aa7f-7458-bc6e-f0f181c1ee7a",
  type: "page-type/track",
  slug: "taylor-swift-2-the-taylor-swift-holiday-collection-last-christmas",
  ownLength: 3.4708833333333335,
  ownProgress: 3.4708833333333335,
  partOfCollections: ["release/taylor-swift-2-the-taylor-swift-holiday-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Last Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "lastchristmas|06HL4z0CvFAxyc27GXpf02|208253",
  song: "song/taylor-swift-last-christmas",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-taylor-swift-holiday-collection",
      discNumber: 1,
      position: 1,
      externalId: "2IprIjGNRlj3TfqUWCAo0C",
      externalLink: "https://open.spotify.com/track/2IprIjGNRlj3TfqUWCAo0C",
    },
  ],
} as const satisfies Track
