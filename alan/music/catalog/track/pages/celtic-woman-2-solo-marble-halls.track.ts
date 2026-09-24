import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloMarbleHalls = {
  id: "01a0abea-6a86-7558-8a95-991a1c465295",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-marble-halls",
  ownLength: 3.825483333333333,
  ownProgress: 3.825483333333333,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "Marble Halls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Méav" }],
  trackKey: "marblehalls|0nBRo87bTZegzYDnIiWkH7|229529",
  song: "song/celtic-woman-marble-halls",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 4,
      externalId: "6LCBjVwYVocM0x6c6SDByH",
      externalLink: "https://open.spotify.com/track/6LCBjVwYVocM0x6c6SDByH",
    },
  ],
} as const satisfies Track
