import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedStayStayStay = {
  id: "01a0ce86-8511-7176-9279-f8d37ed73716",
  type: "page-type/track",
  slug: "taylor-swift-2-red-stay-stay-stay",
  ownLength: 3.4137666666666666,
  ownProgress: 3.4137666666666666,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stay Stay Stay",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "staystaystay|06HL4z0CvFAxyc27GXpf02|204826",
  song: "song/taylor-swift-stay-stay-stay",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 9,
      externalId: "1qLeEu4iXEclkLwoBlMiou",
      externalLink: "https://open.spotify.com/track/1qLeEu4iXEclkLwoBlMiou",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 9,
      externalId: "1x0J8LFX23d5h1zzuzZorc",
      externalLink: "https://open.spotify.com/track/1x0J8LFX23d5h1zzuzZorc",
    },
  ],
} as const satisfies Track
