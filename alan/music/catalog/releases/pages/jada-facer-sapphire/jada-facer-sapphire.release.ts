import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const jadaFacerSapphire = {
  id: "01a0676a-d728-703f-953b-0341d60901d0",
  type: "release",
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
} as const satisfies Release
