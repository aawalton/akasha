import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineModeration = {
  id: "01a0676a-d724-707e-8dd8-7e4074df23c1",
  type: "page-type/release",
  slug: "florence-the-machine-moderation",
  title: "Moderation",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-01-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7kytZHAdRdVINFw8W1TB50",
      externalLink: "https://open.spotify.com/album/7kytZHAdRdVINFw8W1TB50",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
