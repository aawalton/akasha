import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineBigGod = {
  id: "01a0676a-d719-7002-945d-40224ed729ee",
  type: "page-type/release",
  slug: "florence-the-machine-big-god",
  title: "Big God",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
