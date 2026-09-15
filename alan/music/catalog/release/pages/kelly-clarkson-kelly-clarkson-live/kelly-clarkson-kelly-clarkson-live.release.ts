import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonKellyClarksonLive = {
  id: "01a0676a-d722-703a-96ce-200555d1bc18",
  type: "page-type/release",
  slug: "kelly-clarkson-kelly-clarkson-live",
  title: "Kelly Clarkson Live",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 7.403567,
  ownProgress: 7.403567,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-12-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LLwHRxNL24BFuKPHgvGz6",
      externalLink: "https://open.spotify.com/album/4LLwHRxNL24BFuKPHgvGz6",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
