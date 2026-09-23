import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftTimMcgraw = {
  id: "01a0ce86-9544-71ae-a681-56a58ed762b8",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-tim-mcgraw",
  ownLength: 3.8684333333333334,
  ownProgress: 3.8684333333333334,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tim McGraw",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "timmcgraw|06HL4z0CvFAxyc27GXpf02|232106",
  song: "song/taylor-swift-tim-mcgraw",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 1,
      externalId: "0Om9WAB5RS09L80DyOfTNa",
      externalLink: "https://open.spotify.com/track/0Om9WAB5RS09L80DyOfTNa",
    },
  ],
} as const satisfies Track
