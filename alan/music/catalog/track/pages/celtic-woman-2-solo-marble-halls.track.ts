import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloMarbleHalls = {
  id: "01a0abea-6a86-7558-8a95-991a1c465295",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-marble-halls",
  ownLength: 3.825483333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LCBjVwYVocM0x6c6SDByH",
      externalLink: "https://open.spotify.com/track/6LCBjVwYVocM0x6c6SDByH",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Marble Halls",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0nBRo87bTZegzYDnIiWkH7", artistName: "Méav" }],
  trackKey: "marblehalls|0nBRo87bTZegzYDnIiWkH7|229529",
  song: "song/celtic-woman-marble-halls",
} as const satisfies Track
