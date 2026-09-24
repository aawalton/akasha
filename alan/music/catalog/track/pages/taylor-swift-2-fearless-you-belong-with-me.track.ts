import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessYouBelongWithMe = {
  id: "01a0ce86-8fd8-75db-aa2f-9fc69a91f6e8",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-you-belong-with-me",
  ownLength: 3.8522166666666666,
  ownProgress: 3.8522166666666666,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Belong With Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "youbelongwithme|06HL4z0CvFAxyc27GXpf02|231133",
  song: "song/taylor-swift-you-belong-with-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 6,
      externalId: "3GCL1PydwsLodcpv0Ll1ch",
      externalLink: "https://open.spotify.com/track/3GCL1PydwsLodcpv0Ll1ch",
    },
  ],
} as const satisfies Track
