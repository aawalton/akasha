import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioFerrari = {
  id: "01a0676a-d71d-7071-84cf-932be020f516",
  type: "page-type/release",
  slug: "jessica-baio-ferrari",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "56yCYfq1t4VOQ5cwGgka3W",
      externalLink: "https://open.spotify.com/album/56yCYfq1t4VOQ5cwGgka3W",
    },
  ],
  title: "ferrari",
} as const satisfies Release
