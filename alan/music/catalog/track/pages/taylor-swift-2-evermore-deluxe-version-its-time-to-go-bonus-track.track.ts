import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionItsTimeToGoBonusTrack = {
  id: "01a0ce86-5e3c-71e4-80cb-6a5ea91c39fa",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-its-time-to-go-bonus-track",
  ownLength: 4.244,
  ownProgress: 4.244,
  partOfCollections: ["release/taylor-swift-2-evermore-deluxe-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "it’s time to go - bonus track",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "itstimetogobonustrack|06HL4z0CvFAxyc27GXpf02|254640",
  song: "song/taylor-swift-its-time-to-go-bonus-track",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 17,
      externalId: "1kdWw77ZpYOkhxeuhzU1j6",
      externalLink: "https://open.spotify.com/track/1kdWw77ZpYOkhxeuhzU1j6",
    },
  ],
} as const satisfies Track
