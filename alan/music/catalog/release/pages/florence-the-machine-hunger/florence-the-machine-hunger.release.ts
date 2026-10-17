import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineHunger = {
  id: "01a0676a-d720-7073-bcd1-7aa29fcac86f",
  type: "page-type/release",
  slug: "florence-the-machine-hunger",
  title: "Hunger",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-05-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Weyn0N5HAw59OM87LCR7i",
      externalLink: "https://open.spotify.com/album/2Weyn0N5HAw59OM87LCR7i",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
