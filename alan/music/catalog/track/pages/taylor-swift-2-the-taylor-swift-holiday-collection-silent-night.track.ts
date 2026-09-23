import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTaylorSwiftHolidayCollectionSilentNight = {
  id: "01a0ce86-aafc-747b-acdd-9bd88cb202bc",
  type: "page-type/track",
  slug: "taylor-swift-2-the-taylor-swift-holiday-collection-silent-night",
  ownLength: 3.4982166666666665,
  ownProgress: 3.4982166666666665,
  partOfCollections: ["release/taylor-swift-2-the-taylor-swift-holiday-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "silentnight|06HL4z0CvFAxyc27GXpf02|209893",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-taylor-swift-holiday-collection",
      discNumber: 1,
      position: 4,
      externalId: "1cJkUN5LAotktryx2nPCr7",
      externalLink: "https://open.spotify.com/track/1cJkUN5LAotktryx2nPCr7",
    },
  ],
} as const satisfies Track
