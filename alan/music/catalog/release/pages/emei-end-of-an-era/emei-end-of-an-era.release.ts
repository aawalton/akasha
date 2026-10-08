import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiEndOfAnEra = {
  id: "01a0676a-d71d-700e-8b54-9d934886ebdf",
  type: "page-type/release",
  slug: "emei-end-of-an-era",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-10-26",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4I0vC4wtvUmowO4rMM3eOV",
      externalLink: "https://open.spotify.com/album/4I0vC4wtvUmowO4rMM3eOV",
    },
  ],
  title: "End of an Era",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
