import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftInvisible = {
  id: "01a0ce86-970b-72c6-a0eb-89426328d577",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-invisible",
  ownLength: 3.3871,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Invisible",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "invisible|06HL4z0CvFAxyc27GXpf02|203226",
  song: "song/taylor-swift-invisible",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 13,
      externalId: "5OOd01o2YS1QFwdpVLds3r",
      externalLink: "https://open.spotify.com/track/5OOd01o2YS1QFwdpVLds3r",
    },
  ],
} as const satisfies Track
