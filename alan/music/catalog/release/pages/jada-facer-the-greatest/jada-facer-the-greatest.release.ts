import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerTheGreatest = {
  id: "01a0676a-d72d-7017-a2c2-7c1073330de9",
  type: "page-type/release",
  slug: "jada-facer-the-greatest",
  title: "The Greatest",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.217633,
  ownProgress: 2.217633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3o0sZduJc1VeLtLzpbuWu5",
      externalLink: "https://open.spotify.com/album/3o0sZduJc1VeLtLzpbuWu5",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
