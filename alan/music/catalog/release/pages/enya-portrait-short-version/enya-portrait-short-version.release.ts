import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaPortraitShortVersion = {
  id: "01a0676a-d727-7008-953b-cb99b489988c",
  type: "release",
  slug: "enya-portrait-short-version",
  title: "Portrait (Short Version)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 11.928567,
  ownProgress: 11.928567,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5o9DXlkcmZ5R3tGvM2z8px",
      externalLink: "https://open.spotify.com/album/5o9DXlkcmZ5R3tGvM2z8px",
    },
  ],
} as const satisfies Release
