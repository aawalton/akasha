import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerMrBrightside = {
  id: "01a0676a-d725-700f-b9f2-ba3696904891",
  type: "page-type/release",
  slug: "jada-facer-mr-brightside",
  title: "Mr. Brightside",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.45435,
  ownProgress: 3.45435,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-03-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7z4CkC1GkG9IikAcygwj0C",
      externalLink: "https://open.spotify.com/album/7z4CkC1GkG9IikAcygwj0C",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
