import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixSweet = {
  id: "01a0676a-d72a-704c-85d9-53ca41713109",
  type: "page-type/release",
  slug: "pentatonix-sweet",
  title: "Sweet",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-07-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47UYmpTcR2FzI3lWJagsoL",
      externalLink: "https://open.spotify.com/album/47UYmpTcR2FzI3lWJagsoL",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
