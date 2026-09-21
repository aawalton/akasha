import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioOtherSide = {
  id: "01a0676a-d726-7050-978a-f54639398a8c",
  type: "page-type/release",
  slug: "jessica-baio-other-side",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Pl3VjIKGLGFes8Kh5nSij",
      externalLink: "https://open.spotify.com/album/5Pl3VjIKGLGFes8Kh5nSij",
      lastSyncedAt: "2026-03-02",
    },
  ],
  title: "other side",
} as const satisfies Release
