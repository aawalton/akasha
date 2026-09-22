import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kpopDemonHuntersCastSodaPop = {
  id: "01a0c958-5a74-720d-bd60-5e289c429d55",
  type: "page-type/release",
  slug: "kpop-demon-hunters-cast-soda-pop",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/kpop-demon-hunters-cast"],
  position: 0,
  publishedAt: "2025-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Xtqb9ZC0cMj08TdcqZqa2",
      externalLink: "https://open.spotify.com/album/5Xtqb9ZC0cMj08TdcqZqa2",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Soda Pop",
} as const satisfies Release
