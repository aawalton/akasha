import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineLovesick = {
  id: "01a0676a-d724-700e-ad3e-771a55f45d50",
  type: "page-type/release",
  slug: "jenna-raine-lovesick",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2024-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0i1zYZV7sWFxu4Nbcpr2Lc",
      externalLink: "https://open.spotify.com/album/0i1zYZV7sWFxu4Nbcpr2Lc",
    },
  ],
  title: "Lovesick",
} as const satisfies Release
