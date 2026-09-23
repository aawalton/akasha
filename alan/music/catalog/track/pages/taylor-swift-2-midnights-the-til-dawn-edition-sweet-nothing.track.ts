import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionSweetNothing = {
  id: "01a0ce86-519b-7368-9110-74aaac2bf3a0",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-sweet-nothing",
  ownLength: 3.1416,
  ownProgress: 3.1416,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Nothing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "sweetnothing|06HL4z0CvFAxyc27GXpf02|188496",
  song: "song/taylor-swift-sweet-nothing",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 12,
      externalId: "0wavGRldH0AWyu2zvTz8zb",
      externalLink: "https://open.spotify.com/track/0wavGRldH0AWyu2zvTz8zb",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 12,
      externalId: "3zmwONxswBAzGwExPugSLN",
      externalLink: "https://open.spotify.com/track/3zmwONxswBAzGwExPugSLN",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 12,
      externalId: "2L09RYwH5Pjzca6PmbUAw3",
      externalLink: "https://open.spotify.com/track/2L09RYwH5Pjzca6PmbUAw3",
    },
  ],
} as const satisfies Track
