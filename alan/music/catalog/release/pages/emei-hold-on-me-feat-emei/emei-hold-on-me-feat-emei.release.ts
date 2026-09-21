import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiHoldOnMeFeatEmei = {
  id: "01a0676a-d720-7049-8805-0d46ab632333",
  type: "page-type/release",
  slug: "emei-hold-on-me-feat-emei",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-11-10",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tMVeea5aLMQqOFGSPWwyI",
      externalLink: "https://open.spotify.com/album/0tMVeea5aLMQqOFGSPWwyI",
    },
  ],
  title: "Hold On Me (feat. Emei)",
} as const satisfies Release
