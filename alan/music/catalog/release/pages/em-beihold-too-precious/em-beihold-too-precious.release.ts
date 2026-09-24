import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdTooPrecious = {
  id: "01a0676a-d72f-7014-a4db-abc21de5ac0d",
  type: "page-type/release",
  slug: "em-beihold-too-precious",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2022-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2X743cg72FvViLoa1Zagdk",
      externalLink: "https://open.spotify.com/album/2X743cg72FvViLoa1Zagdk",
    },
  ],
  title: "Too Precious",
} as const satisfies Release
