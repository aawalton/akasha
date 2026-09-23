import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationSoItGoes = {
  id: "01a0ce86-76d8-7725-af76-8d763a861808",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-so-it-goes",
  ownLength: 3.7984333333333336,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-reputation",
    "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "So It Goes...",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "soitgoes|06HL4z0CvFAxyc27GXpf02|227906",
  song: "song/taylor-swift-so-it-goes",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 7,
      externalId: "5PxFv9yJEg9dxvbZggykro",
      externalLink: "https://open.spotify.com/track/5PxFv9yJEg9dxvbZggykro",
    },
    {
      release: "release/taylor-swift-2-reputation-stadium-tour-surprise-song-playlist",
      discNumber: 1,
      position: 13,
      externalId: "41T04yafZVrjNq2FqvLtId",
      externalLink: "https://open.spotify.com/track/41T04yafZVrjNq2FqvLtId",
    },
  ],
} as const satisfies Track
