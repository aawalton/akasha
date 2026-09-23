import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionKarma = {
  id: "01a0ce86-5178-7400-bea8-6371047288ba",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-karma",
  ownLength: 3.4142,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Karma",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "karma|06HL4z0CvFAxyc27GXpf02|204852",
  song: "song/taylor-swift-karma",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 11,
      externalId: "7KokYm8cMIXCsGVmUvKtqf",
      externalLink: "https://open.spotify.com/track/7KokYm8cMIXCsGVmUvKtqf",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 11,
      externalId: "5oqDgw5VGBln5dSIOPWyBq",
      externalLink: "https://open.spotify.com/track/5oqDgw5VGBln5dSIOPWyBq",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 11,
      externalId: "45R112Jz5hQeKgITXgSXzs",
      externalLink: "https://open.spotify.com/track/45R112Jz5hQeKgITXgSXzs",
    },
  ],
} as const satisfies Track
