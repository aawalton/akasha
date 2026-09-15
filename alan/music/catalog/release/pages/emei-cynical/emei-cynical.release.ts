import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiCynical = {
  id: "01a0676a-d71b-7049-8655-af08f51b1bd4",
  type: "release",
  slug: "emei-cynical",
  title: "Cynical",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.243033,
  ownProgress: 2.243033,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-07-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "357gbL6nwsDoNxTvZ5YWrm",
      externalLink: "https://open.spotify.com/album/357gbL6nwsDoNxTvZ5YWrm",
    },
  ],
} as const satisfies Release
