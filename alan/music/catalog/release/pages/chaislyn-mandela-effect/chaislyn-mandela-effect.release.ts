import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynMandelaEffect = {
  id: "01a0b9ec-95e7-763e-99c2-d6acd409af18",
  type: "page-type/release",
  slug: "chaislyn-mandela-effect",
  ownLength: 2.8236,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2026-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fAJVr8SzXe9vjy4qwCWUD",
      externalLink: "https://open.spotify.com/album/2fAJVr8SzXe9vjy4qwCWUD",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mandela Effect",
} as const satisfies Release
