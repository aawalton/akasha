import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallOLittleTownOfBethlehem = {
  id: "01a0676a-d726-7011-82b0-e575cbe25e6c",
  type: "page-type/release",
  slug: "paul-cardall-o-little-town-of-bethlehem",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tAwMgWqxsk3iDVpioTUWM",
      externalLink: "https://open.spotify.com/album/1tAwMgWqxsk3iDVpioTUWM",
    },
  ],
  title: "O Little Town of Bethlehem",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
