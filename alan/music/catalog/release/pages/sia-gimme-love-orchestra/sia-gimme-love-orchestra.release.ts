import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaGimmeLoveOrchestra = {
  id: "01a0a59b-f21b-7592-bbb2-7c6eec633ab2",
  type: "page-type/release",
  slug: "sia-gimme-love-orchestra",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sia"],
  position: 0,
  publishedAt: "2026-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XEsl6dgYOXdMcYWgyuSow",
      externalLink: "https://open.spotify.com/album/6XEsl6dgYOXdMcYWgyuSow",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Gimme Love Orchestra",
  createdAt: "2026-09-15T15:07:35.835Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
