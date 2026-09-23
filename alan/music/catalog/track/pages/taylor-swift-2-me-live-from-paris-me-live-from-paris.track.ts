import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MeLiveFromParisMeLiveFromParis = {
  id: "01a0ce86-a658-7921-aae4-7f3ceb29aaf5",
  type: "page-type/track",
  slug: "taylor-swift-2-me-live-from-paris-me-live-from-paris",
  ownLength: 3.5504333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-me-live-from-paris"],
  status: "not-started",
  unit: "unit/minutes",
  title: "ME! - Live From Paris",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "melivefromparis|06HL4z0CvFAxyc27GXpf02|213026",
  song: "song/taylor-swift-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-me-live-from-paris",
      discNumber: 1,
      position: 1,
      externalId: "5fOV54t6mMYv3H9CsnvU81",
      externalLink: "https://open.spotify.com/track/5fOV54t6mMYv3H9CsnvU81",
    },
  ],
} as const satisfies Track
