import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationDancingWithOurHandsTied = {
  id: "01a0ce86-7442-79b0-802a-a0cf040dfe90",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-dancing-with-our-hands-tied",
  ownLength: 3.5251,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Dancing With Our Hands Tied",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "dancingwithourhandstied|06HL4z0CvFAxyc27GXpf02|211506",
  song: "song/taylor-swift-dancing-with-our-hands-tied",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 11,
      externalId: "7I7JbDv63ZJJsSi24DyJrz",
      externalLink: "https://open.spotify.com/track/7I7JbDv63ZJJsSi24DyJrz",
    },
  ],
} as const satisfies Track
