import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AntiHeroIlleniumRemix = {
  id: "01a0676a-d717-7028-bfaa-dbc7d4f177f0",
  type: "page-type/release",
  slug: "taylor-swift-2-anti-hero-illenium-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20wq0dFrgEhhulGXqnb4A6",
      externalLink: "https://open.spotify.com/album/20wq0dFrgEhhulGXqnb4A6",
    },
  ],
  title: "Anti-Hero (ILLENIUM Remix)",
} as const satisfies Release
