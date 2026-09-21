import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiTrustIssues = {
  id: "01a0676a-d72f-7021-8e72-6c790b4eadc3",
  type: "page-type/release",
  slug: "emei-trust-issues",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-08-17",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29FWknxiELyLTfZGBDpmRk",
      externalLink: "https://open.spotify.com/album/29FWknxiELyLTfZGBDpmRk",
    },
  ],
  title: "Trust Issues",
} as const satisfies Release
