import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixes = {
  id: "01a0676a-d729-7014-b8f0-6d48a0958e32",
  type: "page-type/release",
  slug: "billie-eilish-six-feet-under-the-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-02-03",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Chuv69qWaXuK5eCmZ8gCi",
      externalLink: "https://open.spotify.com/album/7Chuv69qWaXuK5eCmZ8gCi",
    },
  ],
  title: "Six Feet Under (The Remixes)",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
