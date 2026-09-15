import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaScreamingSuicide = {
  id: "01a0676a-d728-7059-b2c9-9340d84c2855",
  type: "release",
  slug: "metallica-screaming-suicide",
  title: "Screaming Suicide",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 8.935533,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-01-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RuyqGjhakCG2teiB6VkaC",
      externalLink: "https://open.spotify.com/album/5RuyqGjhakCG2teiB6VkaC",
    },
  ],
} as const satisfies Release
