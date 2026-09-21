import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiCynical = {
  id: "01a0676a-d71b-7049-8655-af08f51b1bd4",
  type: "page-type/release",
  slug: "emei-cynical",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-07-14",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "357gbL6nwsDoNxTvZ5YWrm",
      externalLink: "https://open.spotify.com/album/357gbL6nwsDoNxTvZ5YWrm",
    },
  ],
  title: "Cynical",
} as const satisfies Release
