import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationDress = {
  id: "01a0ce86-7468-7d37-aa22-3d896c239ea8",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-dress",
  ownLength: 3.83955,
  ownProgress: 3.83955,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dress",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "dress|06HL4z0CvFAxyc27GXpf02|230373",
  song: "song/taylor-swift-dress",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 12,
      externalId: "6oVxXO5oQ4pTpO8RSnkzvv",
      externalLink: "https://open.spotify.com/track/6oVxXO5oQ4pTpO8RSnkzvv",
    },
  ],
} as const satisfies Track
