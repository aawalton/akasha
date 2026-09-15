import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineKing = {
  id: "01a0676a-d722-7044-bda2-fc4d3299a90a",
  type: "page-type/release",
  slug: "florence-the-machine-king",
  title: "King",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 4.668833,
  ownProgress: 4.668833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-02-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kGXtKuYw5WuWUsMKKsTOE",
      externalLink: "https://open.spotify.com/album/1kGXtKuYw5WuWUsMKKsTOE",
    },
  ],
} as const satisfies Release
