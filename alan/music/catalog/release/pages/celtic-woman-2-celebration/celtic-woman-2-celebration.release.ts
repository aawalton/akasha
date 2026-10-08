import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Celebration = {
  id: "01a0676a-d71a-7008-9340-3fb49227ad35",
  type: "page-type/release",
  slug: "celtic-woman-2-celebration",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2020-02-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2M3UP3E3ZpozRA9Ys4YLJW",
      externalLink: "https://open.spotify.com/album/2M3UP3E3ZpozRA9Ys4YLJW",
    },
  ],
  title: "Celebration",
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
