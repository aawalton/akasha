import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxCirce = {
  id: "01a0676a-d71a-704f-a4d2-b46c19fff16b",
  type: "page-type/release",
  slug: "lilith-max-circe",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-08-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IMBN2USITcvBJ4AWexejp",
      externalLink: "https://open.spotify.com/album/0IMBN2USITcvBJ4AWexejp",
    },
  ],
  title: "Circe",
} as const satisfies Release
