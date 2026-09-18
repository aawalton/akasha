import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAncestors = {
  id: "01a0b4c8-1e13-76de-ba36-43130b981ed6",
  type: "page-type/release",
  slug: "paul-cardall-ancestors",
  ownLength: 46.89566666666666,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2026-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "183JmvKdpHyQVX1ovoKLnq",
      externalLink: "https://open.spotify.com/album/183JmvKdpHyQVX1ovoKLnq",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ancestors",
} as const satisfies Release
