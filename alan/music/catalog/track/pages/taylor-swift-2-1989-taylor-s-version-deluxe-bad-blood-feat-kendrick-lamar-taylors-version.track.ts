import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989TaylorSVersionDeluxeBadBloodFeatKendrickLamarTaylorsVersion = {
  id: "01a0ce86-4291-745d-91ab-24f0cf621ffc",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-taylor-s-version-deluxe-bad-blood-feat-kendrick-lamar-taylors-version",
  ownLength: 3.32955,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-1989-taylor-s-version-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bad Blood (feat. Kendrick Lamar) (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "2YZyLoL8N0Wb9xBt1NhZWg", artistName: "Kendrick Lamar" },
  ],
  trackKey:
    "badbloodfeatkendricklamartaylorsversion|06HL4z0CvFAxyc27GXpf02,2YZyLoL8N0Wb9xBt1NhZWg|199773",
  song: "song/taylor-swift-bad-blood",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989-taylor-s-version-deluxe",
      discNumber: 1,
      position: 22,
      externalId: "6qAcApH8obo8eqatCKUHd9",
      externalLink: "https://open.spotify.com/track/6qAcApH8obo8eqatCKUHd9",
    },
  ],
} as const satisfies Track
