import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerShallow = {
  id: "01a0676a-d728-706c-ac1e-c3af975f6a8d",
  type: "page-type/release",
  slug: "jada-facer-shallow",
  title: "Shallow",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.1563,
  ownProgress: 3.1563,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cKPmcaSCx63J1IayA54oI",
      externalLink: "https://open.spotify.com/album/4cKPmcaSCx63J1IayA54oI",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
