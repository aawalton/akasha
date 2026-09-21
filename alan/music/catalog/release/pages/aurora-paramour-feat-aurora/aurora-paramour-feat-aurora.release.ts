import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraParamourFeatAurora = {
  id: "01a0676a-d726-705e-8c8a-a8951b099d04",
  type: "page-type/release",
  slug: "aurora-paramour-feat-aurora",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-11-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79NhJfhqNZgDUJtwIn1V1k",
      externalLink: "https://open.spotify.com/album/79NhJfhqNZgDUJtwIn1V1k",
    },
  ],
  title: "PARAMOUR (feat. AURORA)",
} as const satisfies Release
