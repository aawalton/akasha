import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerBetter = {
  id: "01a0676a-d718-704a-ab56-a964fb97a061",
  type: "page-type/release",
  slug: "jada-facer-better",
  title: "Better",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.025983,
  ownProgress: 3.025983,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-01-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CnPoYbEvBBbLht49qsZeX",
      externalLink: "https://open.spotify.com/album/1CnPoYbEvBBbLht49qsZeX",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
