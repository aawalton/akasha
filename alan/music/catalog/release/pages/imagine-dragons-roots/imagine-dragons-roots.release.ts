import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsRoots = {
  id: "01a0676a-d728-7020-b6c2-809b23f5d254",
  type: "page-type/release",
  slug: "imagine-dragons-roots",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-08-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6SW9d1zYefC5SUzPsJFUMU",
      externalLink: "https://open.spotify.com/album/6SW9d1zYefC5SUzPsJFUMU",
    },
  ],
  title: "Roots",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
