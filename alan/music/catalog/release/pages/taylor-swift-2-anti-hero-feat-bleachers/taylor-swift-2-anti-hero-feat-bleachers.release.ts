import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AntiHeroFeatBleachers = {
  id: "01a0676a-d717-7027-a775-e3ab67f130c9",
  type: "page-type/release",
  slug: "taylor-swift-2-anti-hero-feat-bleachers",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "18DEtVsRVQ4rxqnOIAPwRB",
      externalLink: "https://open.spotify.com/album/18DEtVsRVQ4rxqnOIAPwRB",
    },
  ],
  title: "Anti-Hero (feat. Bleachers)",
} as const satisfies Release
