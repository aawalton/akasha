import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreComposingColentine = {
  id: "01a0676a-d71b-701f-9ad2-227cef220466",
  type: "page-type/release",
  slug: "yaelokre-composing-colentine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2026-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2zXl66SXNVTZX0DkkNjFy7",
      externalLink: "https://open.spotify.com/album/2zXl66SXNVTZX0DkkNjFy7",
      lastSyncedAt: "2026-03-02",
    },
  ],
  title: "Composing Colentine",
} as const satisfies Release
