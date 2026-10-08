import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerFear = {
  id: "01a0676a-d71d-7069-837a-844d45424b19",
  type: "page-type/release",
  slug: "jada-facer-fear",
  title: "fear",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.5275,
  ownProgress: 2.5275,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-03-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1woqodRMVlyk4KWJopxVNS",
      externalLink: "https://open.spotify.com/album/1woqodRMVlyk4KWJopxVNS",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
