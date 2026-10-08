import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishEverythingIWanted = {
  id: "01a0676a-d71d-7041-ac83-71ce8e8f674f",
  type: "page-type/release",
  slug: "billie-eilish-everything-i-wanted",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2019-11-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4i3rAwPw7Ln2YrKDusaWyT",
      externalLink: "https://open.spotify.com/album/4i3rAwPw7Ln2YrKDusaWyT",
    },
  ],
  title: "everything i wanted",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
