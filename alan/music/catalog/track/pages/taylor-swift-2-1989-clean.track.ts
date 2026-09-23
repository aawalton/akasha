import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989Clean = {
  id: "01a0ce86-8006-7a99-b93c-c20936b24af3",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-clean",
  ownLength: 4.516666666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Clean",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "clean|06HL4z0CvFAxyc27GXpf02|271000",
  song: "song/taylor-swift-clean",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 13,
      externalId: "06WgOCf0LV2h4keYXDRnuh",
      externalLink: "https://open.spotify.com/track/06WgOCf0LV2h4keYXDRnuh",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 13,
      externalId: "4bXCcoesMt8u99xMsbLr9U",
      externalLink: "https://open.spotify.com/track/4bXCcoesMt8u99xMsbLr9U",
    },
  ],
} as const satisfies Track
