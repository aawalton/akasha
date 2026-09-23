import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionTheMomentIKnew = {
  id: "01a0ce86-8655-782e-902b-da2fbdc80e07",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-the-moment-i-knew",
  ownLength: 4.759333333333333,
  ownProgress: 4.759333333333333,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Moment I Knew",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "themomentiknew|06HL4z0CvFAxyc27GXpf02|285560",
  song: "song/taylor-swift-the-moment-i-knew",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 17,
      externalId: "5AsmAjBSSQjRPWgAYIp8tm",
      externalLink: "https://open.spotify.com/track/5AsmAjBSSQjRPWgAYIp8tm",
    },
  ],
} as const satisfies Track
