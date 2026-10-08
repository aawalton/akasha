import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayProspektSMarch = {
  id: "01a0676a-d727-7028-bb81-89e5bde8c1fc",
  type: "page-type/release",
  slug: "coldplay-prospekt-s-march",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-06-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PpuVbbyLfgq8HrESvt2d4",
      externalLink: "https://open.spotify.com/album/0PpuVbbyLfgq8HrESvt2d4",
    },
  ],
  title: "Prospekt's March",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
