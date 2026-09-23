import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionMidnightRain = {
  id: "01a0ce86-50b6-7399-a95a-9b179848ac9e",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-midnight-rain",
  ownLength: 2.9130333333333334,
  ownProgress: 2.9130333333333334,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "midnightrain|06HL4z0CvFAxyc27GXpf02|174782",
  song: "song/taylor-swift-midnight-rain",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 6,
      externalId: "3rWDp9tBPQR9z6U5YyRSK4",
      externalLink: "https://open.spotify.com/track/3rWDp9tBPQR9z6U5YyRSK4",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 6,
      externalId: "6Nl7KyvjkFncGsjB49SxLl",
      externalLink: "https://open.spotify.com/track/6Nl7KyvjkFncGsjB49SxLl",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 6,
      externalId: "4eKMqf9ZMSclDX7V9Ptg7x",
      externalLink: "https://open.spotify.com/track/4eKMqf9ZMSclDX7V9Ptg7x",
    },
  ],
} as const satisfies Track
