import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const emeiTrustIssues = {
  id: "01a0676a-d72f-7021-8e72-6c790b4eadc3",
  type: "release",
  slug: "emei-trust-issues",
  title: "Trust Issues",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.348,
  ownProgress: 2.348,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-08-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29FWknxiELyLTfZGBDpmRk",
      externalLink: "https://open.spotify.com/album/29FWknxiELyLTfZGBDpmRk",
    },
  ],
} as const satisfies Release
