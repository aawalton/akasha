import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineMyBestDressDemo = {
  id: "01a0676a-d725-7023-be08-5f79742c9349",
  type: "page-type/release",
  slug: "florence-the-machine-my-best-dress-demo",
  title: "My Best Dress (Demo)",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 2.576433,
  ownProgress: 2.576433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-07-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LZOlK8ktgEVoX2DlKsm4S",
      externalLink: "https://open.spotify.com/album/5LZOlK8ktgEVoX2DlKsm4S",
    },
  ],
} as const satisfies Release
