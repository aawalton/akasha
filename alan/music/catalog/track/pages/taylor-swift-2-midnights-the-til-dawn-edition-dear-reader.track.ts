import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionDearReader = {
  id: "01a0ce86-4fe4-736f-9968-0ff7cd1bb850",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-dear-reader",
  ownLength: 3.753233333333333,
  ownProgress: 3.753233333333333,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Dear Reader",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "dearreader|06HL4z0CvFAxyc27GXpf02|225194",
  song: "song/taylor-swift-dear-reader",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 20,
      externalId: "3QF5RsWzK1lCvf2o2cY65P",
      externalLink: "https://open.spotify.com/track/3QF5RsWzK1lCvf2o2cY65P",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 20,
      externalId: "10GRRCR5fctuOF4GFmATJI",
      externalLink: "https://open.spotify.com/track/10GRRCR5fctuOF4GFmATJI",
    },
  ],
} as const satisfies Track
