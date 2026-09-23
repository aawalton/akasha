import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2AntiHeroRemixesAntiHeroKungsRemix = {
  id: "01a0ce86-9d39-7384-9f33-5010a54f8fc2",
  type: "page-type/track",
  slug: "taylor-swift-2-anti-hero-remixes-anti-hero-kungs-remix",
  ownLength: 3.243533333333333,
  ownProgress: 3.243533333333333,
  partOfCollections: ["release/taylor-swift-2-anti-hero-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Anti-Hero - Kungs Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "7keGfmQR4X5w0two1xKZ7d", artistName: "Kungs" },
  ],
  trackKey: "antiherokungsremix|06HL4z0CvFAxyc27GXpf02,7keGfmQR4X5w0two1xKZ7d|194612",
  song: "song/taylor-swift-anti-hero",
  carriedBy: [
    {
      release: "release/taylor-swift-2-anti-hero-remixes",
      discNumber: 1,
      position: 3,
      externalId: "2oWpe2L8ypC080BxpDVuTY",
      externalLink: "https://open.spotify.com/track/2oWpe2L8ypC080BxpDVuTY",
    },
  ],
} as const satisfies Track
