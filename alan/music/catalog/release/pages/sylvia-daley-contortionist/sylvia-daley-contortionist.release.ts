import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleyContortionist = {
  id: "01a0a6c3-6b9d-7a8f-802b-2247e67aa0c7",
  type: "page-type/release",
  slug: "sylvia-daley-contortionist",
  ownLength: 2.04615,
  ownProgress: 0,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2026-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mcIPjiiapmzZx7GR6JgZk",
      externalLink: "https://open.spotify.com/album/4mcIPjiiapmzZx7GR6JgZk",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Contortionist",
} as const satisfies Release
