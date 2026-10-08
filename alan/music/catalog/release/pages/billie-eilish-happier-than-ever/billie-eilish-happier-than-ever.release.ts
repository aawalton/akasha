import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishHappierThanEver = {
  id: "01a0676a-d71f-7048-8dee-be24cf239e03",
  type: "page-type/release",
  slug: "billie-eilish-happier-than-ever",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2021-07-30",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0JGOiO34nwfUdDrD612dOp",
      externalLink: "https://open.spotify.com/album/0JGOiO34nwfUdDrD612dOp",
    },
  ],
  title: "Happier Than Ever",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
