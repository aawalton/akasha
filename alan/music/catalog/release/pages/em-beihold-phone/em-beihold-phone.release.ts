import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdPhone = {
  id: "01a0676a-d726-7075-81ed-791914d0ba26",
  type: "page-type/release",
  slug: "em-beihold-phone",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2023-07-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ajeVOWfz9qfKlEXDBN5Uo",
      externalLink: "https://open.spotify.com/album/7ajeVOWfz9qfKlEXDBN5Uo",
    },
  ],
  title: "Phone",
} as const satisfies Release
