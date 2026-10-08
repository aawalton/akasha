import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerLucky = {
  id: "01a0676a-d724-7011-a265-f04a66e8c618",
  type: "page-type/release",
  slug: "jada-facer-lucky",
  title: "Lucky",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.2378,
  ownProgress: 3.2378,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-08-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0eH1qU9tIewENJcbg9JVdK",
      externalLink: "https://open.spotify.com/album/0eH1qU9tIewENJcbg9JVdK",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
