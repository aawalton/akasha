import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineModeration = {
  id: "01a0676a-d724-707e-8dd8-7e4074df23c1",
  type: "page-type/release",
  slug: "florence-the-machine-moderation",
  title: "Moderation",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 5.040133,
  ownProgress: 5.040133,
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
} as const satisfies Release
