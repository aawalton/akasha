import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTaylorSVersionStateOfGraceTaylorsVersion = {
  id: "01a0ce86-51e0-7ca8-9567-88ee90d9fe5b",
  type: "page-type/track",
  slug: "taylor-swift-2-red-taylor-s-version-state-of-grace-taylors-version",
  ownLength: 4.92355,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red-taylor-s-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "State Of Grace (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "stateofgracetaylorsversion|06HL4z0CvFAxyc27GXpf02|295413",
  song: "song/taylor-swift-state-of-grace",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-taylor-s-version",
      discNumber: 1,
      position: 1,
      externalId: "6lzc0Al0zfZOIFsFvBS1ki",
      externalLink: "https://open.spotify.com/track/6lzc0Al0zfZOIFsFvBS1ki",
    },
  ],
} as const satisfies Track
