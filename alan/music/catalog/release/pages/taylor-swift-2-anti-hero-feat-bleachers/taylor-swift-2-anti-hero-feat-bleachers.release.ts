import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AntiHeroFeatBleachers = {
  id: "01a0676a-d717-7027-a775-e3ab67f130c9",
  type: "page-type/release",
  slug: "taylor-swift-2-anti-hero-feat-bleachers",
  title: "Anti-Hero (feat. Bleachers)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 7.15145,
  ownProgress: 7.15145,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-11-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "18DEtVsRVQ4rxqnOIAPwRB",
      externalLink: "https://open.spotify.com/album/18DEtVsRVQ4rxqnOIAPwRB",
    },
  ],
} as const satisfies Release
