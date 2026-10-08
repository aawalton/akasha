import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishMyboiTroyboiRemix = {
  id: "01a0676a-d725-703c-a65e-57d6c2aad7a8",
  type: "page-type/release",
  slug: "billie-eilish-myboi-troyboi-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2018-03-09",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5m9lO9SriYMPpXTrVIU8P5",
      externalLink: "https://open.spotify.com/album/5m9lO9SriYMPpXTrVIU8P5",
    },
  ],
  title: "MyBoi (TroyBoi Remix)",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
