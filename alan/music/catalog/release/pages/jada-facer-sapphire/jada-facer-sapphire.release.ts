import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerSapphire = {
  id: "01a0676a-d728-703f-953b-0341d60901d0",
  type: "page-type/release",
  slug: "jada-facer-sapphire",
  title: "Sapphire",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.73275,
  ownProgress: 2.73275,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-08-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vswlMKsrPbYGpT3rtsPmi",
      externalLink: "https://open.spotify.com/album/7vswlMKsrPbYGpT3rtsPmi",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
