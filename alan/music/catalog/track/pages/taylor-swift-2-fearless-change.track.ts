import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessChange = {
  id: "01a0ce86-90f0-79e8-af88-2c11d5e611fb",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-change",
  ownLength: 4.6706666666666665,
  ownProgress: 4.6706666666666665,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Change",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "change|06HL4z0CvFAxyc27GXpf02|280240",
  song: "song/taylor-swift-change",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 13,
      externalId: "1yACRKAwlXWhXXFUSkvzhD",
      externalLink: "https://open.spotify.com/track/1yACRKAwlXWhXXFUSkvzhD",
    },
  ],
} as const satisfies Track
