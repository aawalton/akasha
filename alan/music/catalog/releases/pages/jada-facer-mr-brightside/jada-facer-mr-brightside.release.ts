import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const jadaFacerMrBrightside = {
  id: "01a0676a-d725-700f-b9f2-ba3696904891",
  type: "release",
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
} as const satisfies Release
