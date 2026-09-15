import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioOtherSide = {
  id: "01a0676a-d726-7050-978a-f54639398a8c",
  type: "release",
  slug: "jessica-baio-other-side",
  title: "other side",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 3.012667,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2026-02-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Pl3VjIKGLGFes8Kh5nSij",
      externalLink: "https://open.spotify.com/album/5Pl3VjIKGLGFes8Kh5nSij",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
