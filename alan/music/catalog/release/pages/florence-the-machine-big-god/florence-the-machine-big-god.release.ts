import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineBigGod = {
  id: "01a0676a-d719-7002-945d-40224ed729ee",
  type: "page-type/release",
  slug: "florence-the-machine-big-god",
  title: "Big God",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 4.029333,
  ownProgress: 4.029333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-06-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GMpSP95wIod2jckN8htUS",
      externalLink: "https://open.spotify.com/album/3GMpSP95wIod2jckN8htUS",
    },
  ],
} as const satisfies Release
