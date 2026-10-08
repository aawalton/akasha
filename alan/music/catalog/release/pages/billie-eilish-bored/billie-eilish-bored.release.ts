import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBored = {
  id: "01a0676a-d719-7022-8669-66eb03d29e21",
  type: "page-type/release",
  slug: "billie-eilish-bored",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-03-30",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iyJ8i3eKbez8JXDbsHIdZ",
      externalLink: "https://open.spotify.com/album/4iyJ8i3eKbez8JXDbsHIdZ",
    },
  ],
  title: "Bored",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
