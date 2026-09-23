import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AntiHeroRemixes = {
  id: "01a0676a-d717-7029-9f0d-2df30fd050e2",
  type: "page-type/release",
  slug: "taylor-swift-2-anti-hero-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7irmI5g3OLC1gUXlxysOWt",
      externalLink: "https://open.spotify.com/album/7irmI5g3OLC1gUXlxysOWt",
    },
  ],
  title: "Anti-Hero (Remixes)",
} as const satisfies Release
