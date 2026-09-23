import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989ShakeItOff = {
  id: "01a0ce86-7ee5-705b-80ff-3c429fb249d6",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-shake-it-off",
  ownLength: 3.6533333333333333,
  ownProgress: 3.6533333333333333,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shake It Off",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "shakeitoff|06HL4z0CvFAxyc27GXpf02|219200",
  song: "song/taylor-swift-shake-it-off",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 6,
      externalId: "5xTtaWoae3wi06K5WfVUUH",
      externalLink: "https://open.spotify.com/track/5xTtaWoae3wi06K5WfVUUH",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 6,
      externalId: "3fthfkkvy9av3q3uAGVf7U",
      externalLink: "https://open.spotify.com/track/3fthfkkvy9av3q3uAGVf7U",
    },
  ],
} as const satisfies Track
