import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaGimmeLoveOrchestra = {
  id: "01a0a59b-f21b-7592-bbb2-7c6eec633ab2",
  type: "release",
  slug: "sia-gimme-love-orchestra",
  ownLength: 2.9942,
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
} as const satisfies Release
