import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2AntiHeroIlleniumRemixAntiHeroIlleniumRemix = {
  id: "01a0ce86-9cc1-71d7-affe-7b447fb75043",
  type: "page-type/track",
  slug: "taylor-swift-2-anti-hero-illenium-remix-anti-hero-illenium-remix",
  ownLength: 4.466,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-anti-hero-illenium-remix"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Anti-Hero - ILLENIUM Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "45eNHdiiabvmbp4erw26rg", artistName: "ILLENIUM" },
  ],
  trackKey: "antiheroilleniumremix|06HL4z0CvFAxyc27GXpf02,45eNHdiiabvmbp4erw26rg|267960",
  song: "song/taylor-swift-anti-hero",
  carriedBy: [
    {
      release: "release/taylor-swift-2-anti-hero-illenium-remix",
      discNumber: 1,
      position: 1,
      externalId: "6C0H8ts9M6deezz0yYR6LK",
      externalLink: "https://open.spotify.com/track/6C0H8ts9M6deezz0yYR6LK",
    },
  ],
} as const satisfies Track
