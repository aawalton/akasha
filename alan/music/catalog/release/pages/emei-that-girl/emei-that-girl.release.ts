import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiThatGirl = {
  id: "01a0676a-d72c-7015-99cd-6a56b2ce6ea9",
  type: "page-type/release",
  slug: "emei-that-girl",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-07-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wrW0h4PjKiU3lyvbMtJrN",
      externalLink: "https://open.spotify.com/album/7wrW0h4PjKiU3lyvbMtJrN",
    },
  ],
  title: "That Girl",
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
