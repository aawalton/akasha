import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaAlwaysAnAngel = {
  id: "01a0676a-d716-7035-9f11-e222664a3fc8",
  type: "page-type/release",
  slug: "alexandria-always-an-angel",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2025-04-18",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CIBomOjvC0MijxCF9LTyM",
      externalLink: "https://open.spotify.com/album/4CIBomOjvC0MijxCF9LTyM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Always an Angel",
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
