import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineKing = {
  id: "01a0676a-d722-7044-bda2-fc4d3299a90a",
  type: "page-type/release",
  slug: "florence-the-machine-king",
  title: "King",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
