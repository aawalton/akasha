import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2AntiHeroRemixesAntiHeroJaydaGRemix = {
  id: "01a0ce86-9d63-75e6-9c59-eeab8a1e00cf",
  type: "page-type/track",
  slug: "taylor-swift-2-anti-hero-remixes-anti-hero-jayda-g-remix",
  ownLength: 3.5949333333333335,
  ownProgress: 3.5949333333333335,
  partOfCollections: ["release/taylor-swift-2-anti-hero-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Anti-Hero - Jayda G Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "3NKVm2Jedcf6ibJr6pMUVx", artistName: "Jayda G" },
  ],
  trackKey: "antiherojaydagremix|06HL4z0CvFAxyc27GXpf02,3NKVm2Jedcf6ibJr6pMUVx|215696",
  song: "song/taylor-swift-anti-hero",
  carriedBy: [
    {
      release: "release/taylor-swift-2-anti-hero-remixes",
      discNumber: 1,
      position: 4,
      externalId: "4YrpqEBNuz7IMsZtUP6bNQ",
      externalLink: "https://open.spotify.com/track/4YrpqEBNuz7IMsZtUP6bNQ",
    },
  ],
} as const satisfies Track
